import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainGuard } from "../shared/guards/main.guard";
import { FuncionarioComponent } from "./components/funcionario.component";
import { LancamentoComponent } from "./components/lancamento/lancamento.component";
import { ListagemComponent } from "./components/listagem/listagem.component";

export const funcionarioRoutes: Routes = [
    {
        path: 'funcionario',
        component: FuncionarioComponent,
        canActivate: [MainGuard],
        children: [
            {
                path: '',
                component: LancamentoComponent
            },
            {
                path: 'listagem',
                component: ListagemComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(funcionarioRoutes)],
    exports: [RouterModule]
})
export class FuncionarioRoutingModule {}