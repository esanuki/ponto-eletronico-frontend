import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpUtilService {

    constructor() {}

    headers(){
        let httpHeaders: HttpHeaders = new HttpHeaders();

        if (localStorage['token']) {
            httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + localStorage['token']);
        }

        return { headers : httpHeaders};
    }

    obterIdUsuario(){
        if (!localStorage['token']) return '';
        
        const dadosUsuario = this.obterDadosUsuario();
        return dadosUsuario ? dadosUsuario.id : '';
    }

    obterDadosUsuario(){
        if (!localStorage['token']) return '';

        return JSON.parse(atob(localStorage['token'].split('.')[1]));
    }

    obterIdEmpresa() {
        if (!localStorage['token']) return '';

        const dadosUsuario = this.obterDadosUsuario();
        return dadosUsuario ? dadosUsuario.empresaId : '';
    }

    obterPerfil() {
        if (!localStorage['token']) return '';

        const dadosUsuario = this.obterDadosUsuario();
        return dadosUsuario ? dadosUsuario.role : '';
    }

    deleteToken(){
        delete localStorage['token'];
    }

    autenticado(): boolean {
        return localStorage['token'];
    }
}