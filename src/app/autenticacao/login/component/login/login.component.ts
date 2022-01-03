import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private service: LoginService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  login(){
    if (this.form.invalid) return;

    const login = this.form.getRawValue();

    this.service.logar(login)
      .subscribe(data => {
        const token = data['data']['token'];
        
        localStorage['token'] = token;

        const usuarioData = JSON.parse(atob(token.split('.')[1]));
        if (usuarioData['role'] == 'ROLE_ADMIN') {
          alert('Deve redirecionar para página de admin');
          this.router.navigate(['/admin']);
        } else {
          alert('Deve redirecionar para página de funcionário');
          this.router.navigate(['/funcionario'])
        }
      },
      err => {
        let msg: string = 'Tente novamente em instantes';

        if (err['status'] == 401)
          msg = 'E-mail/senha inválido(s)';

        this.snackBar.open(msg, 'Erro', {duration: 5000});
      })
  }

}
