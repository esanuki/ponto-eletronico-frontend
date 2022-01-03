import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { CadastrarPjComponent } from "./components/cadastrar-pj.component";
import { CadastroPjComponent } from "./components/cadastro-pj/cadastro-pj/cadastro-pj.component";

export const cadastroPjRoutes: Routes = [
    {
        path: 'cadastro-pj',
        component: CadastrarPjComponent,
        children: [
            {
                path: '',
                component: CadastroPjComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(cadastroPjRoutes)],
    exports: [RouterModule]
})
export class CadastroPjRoutingModule {}