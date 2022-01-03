import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { cadastroPjRoutes } from "../cadastro-pj/cadastro-pj-routing.module";
import { CadastrarPjComponent } from "../cadastro-pj/components/cadastrar-pj.component";
import { CadastrarPfComponent } from "./components/cadastrar-pf.component";
import { CadastroPfComponent } from "./components/cadastro-pf/cadastro-pf.component";

export const cadastroPfRoutes : Routes = [
    {
        path: 'cadastro-pf',
        component: CadastrarPfComponent,
        children : [
            {
                path: '',
                component: CadastroPfComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(cadastroPfRoutes)],
    exports: [RouterModule]
})
export class CadastroPfRoutingModule {}