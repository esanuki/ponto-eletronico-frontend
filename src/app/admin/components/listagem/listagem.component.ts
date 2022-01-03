import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  form: FormGroup;

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  totalLancamentos: number;

  funcionarioId: string;
  funcionarios: Funcionario[];

  @ViewChild(MatSelect) matSelect: MatSelect;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private httpUtil: HttpUtilService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private lancamentoService: LancamentoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.gerarForm();
    this.ordemPadrao();
    this.obterFuncionarios();
  }

  gerarForm(){
    this.form = this.fb.group({
      funcs: ['',[]]
    })
  }

  ordemPadrao(){
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string{
    return sessionStorage['funcionarioId'] || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe(data => {
        const usuarioId: string = this.httpUtil.obterIdUsuario();
        this.funcionarios = (data.data as Funcionario[]).filter(func => func.id != usuarioId);

        if (this.funcId) {
          this.form.get('funcs').setValue(parseInt(this.funcId, 10));
        }

        this.exibirLancamentos();
      },
      err => {
        this.snackBar.open("Erro obtendo funcionários", "Erro", { duration: 5000 });
      })
  }

  exibirLancamentos(){
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.selected['value'];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }

    sessionStorage['funcionarioId'] = this.funcionarioId;

    this.lancamentoService.listarLancamentoPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao
    ).subscribe(data => {
      this.totalLancamentos = data['data'].totalElements;
      const lancamentos = data['data'].content as Lancamento[];
      this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
    },
    err => {
      this.snackBar.open("Erro obtendo lançamentos.", "Erro", { duration: 5000 });
    })

  }

  removerDialog(lancamentoId: string){
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(lancamentoId);
      }
    })
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId)
      .subscribe(data => {
        this.snackBar.open("Lançamento removido com sucesso", "Sucesso", { duration: 5000 });
        this.exibirLancamentos();
      },
      err => {
        let msg: string = "Tente novamente em instantes";
        if (err.status == 400)
          msg = err.error.errors.join(' ');

        this.snackBar.open(msg, "Erro", { duration: 5000 });
      })
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort){
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }

    this.exibirLancamentos();
  }

}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
        <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `
})
export class ConfirmarDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
