import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CadastroPfService } from '../../services/cadastro-pf.service';

@Component({
  selector: 'app-cadastro-pf',
  templateUrl: './cadastro-pf.component.html',
  styleUrls: ['./cadastro-pf.component.css']
})
export class CadastroPfComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cadastroPfService: CadastroPfService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['',[Validators.required, CpfValidator]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    })
  }

  cadastrar(){
    if (this.form.invalid) {
      this.snackBar.open('Formulário inválido', 'Erro', {duration: 5000});
      return;
    }

    const cadastroPf = this.form.getRawValue();

    this.cadastroPfService.cadastrar(cadastroPf)
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
