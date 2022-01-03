import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  private readonly PATH: string = 'auth';

  constructor(
    private http: HttpClient
  ) { }

  logar(login: Login): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, login );
  }
}
