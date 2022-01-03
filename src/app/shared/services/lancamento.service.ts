import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Lancamento } from "../models/lancamento.model";
import { environment as env } from "src/environments/environment";
import { HttpUtilService } from "./http-util.service";
import { Observable } from "rxjs";

@Injectable()
export class LancamentoService {
    
    private readonly PATH: string = 'api/lancamentos';
    private readonly PATH_ULTIMO_LANC = '/funcionario/{funcionarioId}/ultimo';
    private readonly PATH_LANCAMENTOS = '/funcionario/{funcionarioId}';
    private readonly PATH_TODOS_LANC = '/funcionario/{funcionarioId}/todos';

    constructor(
        private http: HttpClient,
        private httpUtil: HttpUtilService
    ) {}

    cadastrar(lancamento: Lancamento) {
        return this.http.post(env.baseUrl + this.PATH, lancamento, this.httpUtil.headers());
    }

    obterUltimoLancamento(): Observable<any> {
        return this.http.get(
            env.baseUrl + this.PATH + 
            this.PATH_ULTIMO_LANC.replace('{funcionarioId}', this.httpUtil.obterIdUsuario()), 
            this.httpUtil.headers());
    }

    listarTodosLancamentos(): Observable<any> {
        return this.http.get(
            env.baseUrl + this.PATH + this.PATH_TODOS_LANC.replace('{funcionarioId}', this.httpUtil.obterIdUsuario()),
            this.httpUtil.headers()
        );
    }

    listarLancamentoPorFuncionario(
        funcionarioId: string,
        pagina: number,
        ordem: string,
        direcao: string
    ): Observable<any>{
        
        const url: string = env.baseUrl + this.PATH +
            this.PATH_LANCAMENTOS.replace('{funcionarioId}', funcionarioId);
        
        const params: string = `?pag=${pagina}&ord=${ordem}&dir=${direcao}`;

        return this.http.get(url + params, this.httpUtil.headers());
    }

    remover (lancamentoId: string): Observable<any> {
        return this.http.delete(
            env.baseUrl + this.PATH + '/' + lancamentoId,
            this.httpUtil.headers()
        );
    }

    buscarPorId(lancamentoId: string): Observable<any> {
        return this.http.get(env.baseUrl + this.PATH + '/' + lancamentoId,
            this.httpUtil.headers());
    }

    atualizar(lancamento: Lancamento){
        return this.http.put(
            env.baseUrl + this.PATH + '/' + lancamento.id,
            lancamento,
            this.httpUtil.headers()
        );
    }
}