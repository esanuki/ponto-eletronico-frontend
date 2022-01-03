import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { HttpUtilService } from "../services/http-util.service";

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {
    
    constructor(
        private httpUtilService: HttpUtilService,
        private route: Router ) {}
    
    canActivate(): boolean {
        if (this.httpUtilService.autenticado()) return true;

        this.route.navigate(['/login']);
        return false
    }

}