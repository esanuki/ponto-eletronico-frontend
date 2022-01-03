import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroPj } from '../models/cadastro-pj';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroPjService {

  private readonly PATH: string = 'api/cadastrar-pj';

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(cadastroPj: CadastroPj): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, cadastroPj);
  }
}
