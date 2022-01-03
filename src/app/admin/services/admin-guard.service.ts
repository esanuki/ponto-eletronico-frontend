import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { HttpUtilService } from "../../shared/services/http-util.service";

@Injectable()
export class AdminGuard implements CanActivate {
    
    constructor(
        private httpUtilService: HttpUtilService,
        private router: Router
    ){

    }

    canActivate(): boolean {
        if (this.httpUtilService.obterPerfil() === 'ROLE_ADMIN') return true;

        this.router.navigate(['/funcionario']);
        return false;
    }

}