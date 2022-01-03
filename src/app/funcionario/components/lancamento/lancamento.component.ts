import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Tipo } from 'src/app/shared/enum/tipo.enum';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;
  
  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private httpUtil: HttpUtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.obterGeoLocation();
    this.obterUltimoLancamento();
  }

  obterGeoLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
    }
  }

  obterUltimoLancamento(){
    this.lancamentoService.obterUltimoLancamento()
      .subscribe(data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : Tipo.TERMINO_TRABALHO;
      },
      err => {
        this.snackBar.open('Erro obtendo ultimo lancamento', 'Erro', {duration: 5000});
      })
  }

  cadastrar(tipo: Tipo) {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httpUtil.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento)
      .subscribe(data => {
        this.snackBar.open('Lançamento realizado com sucesso', 'Sucesso', { duration: 5000});
        this.ultimoTipoLancado = tipo;
        this.router.navigate(['/funcionario/listagem']);
      },
      err =>  {
        let msg = 'Tente novamente em instantes';
        if (err.status == 400)
          msg = err.error.errors.join(' ');

        this.snackBar.open(msg, 'Erro', {duration: 5000});
      })
  }

  iniciarTrabalho(){
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  iniciarAlmoco(){
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco(){
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  terminarTrabalho(){
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  exibirInicioTrabalho(): boolean{
    return this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirInicioAlmoco(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
  }

  exibirTerminoTrabalho(): boolean{
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
      this.ultimoTipoLancado == Tipo.INICIO_ALMOCO ||
      this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

}
