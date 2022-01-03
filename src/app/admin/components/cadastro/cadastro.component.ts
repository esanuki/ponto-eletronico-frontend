import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Tipo } from 'src/app/shared/enum/tipo.enum';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];

  constructor(
    private fb: FormBuilder,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.geraForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO,
      Tipo.TERMINO_TRABALHO
    ]
  }

  geraForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    })
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for(let i = inicio; i <= termino; i++){
      let numero: string = i.toString();
      if (i < 10)
        numero = "0" + numero;

      numeros.push(numero);
    }
    return numeros;
  }

  cadastrar(){
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido', 'Erro', { duration: 5000 });
      return;
    }
    

      const dados = this.form.value;
      this.lancamentoService.cadastrar(this.obterLancamento(dados))
        .subscribe(data => {
          this.snackBar.open('Cadastro efetuado com sucesso', 'Sucesso', { duration: 5000});
          this.route.navigate(['/admin']);
        },
        err => {
          let msg = 'Tente novamente em instantes';
          if (err.status == 400)
            msg = err.error.errors.join(' ');

          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        })
  }

  obterLancamento(dados: any){
    const data = moment(dados.data);
    data.set({
      hour: dados.hora,
      minute: dados.minutos,
      second: 0
    });

    let lancamento = new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      '',
      this.funcionarioID
    )

    return lancamento;
  }

  get funcionarioID(): string{
    return sessionStorage['funcionarioId'] ?? false;
  } 

}
