import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CadastroPjService } from '../../../services/cadastro-pj.service';

@Component({
  selector: 'app-cadastro-pj',
  templateUrl: './cadastro-pj.component.html',
  styleUrls: ['./cadastro-pj.component.css']
})
export class CadastroPjComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroPjService: CadastroPjService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      cnpj: ['', [Validators.required, CnpjValidator]],
    })
  }

  cadastrar() {
    if (this.form.invalid) {
      this.snackBar.open('Formulário invalido!', 'Erro', {duration: 5000});
      return;
    }

    const cadastroPj = this.form.getRawValue();

    this.cadastroPjService.cadastrar(cadastroPj)
      .subscribe(data => {
        this.snackBar.open('Realize o login para acessar o sistema', 'Sucesso', {duration:5000});
        this.router.navigate(['/login']);
      },
      err => {
        let msg: string = 'Tente novamente em instantes';
        if (err.status == 400)
          msg = err.error.errors.join(' ');

        this.snackBar.open(msg, 'Erro', {duration: 5000});
      })
  }

}
