import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroPf } from '../Models/cadastro-pf';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroPfService {

  private readonly PATH: string = 'api/cadastrar-pf';

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(cadastroPf: CadastroPf): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, cadastroPf);
  }
}
