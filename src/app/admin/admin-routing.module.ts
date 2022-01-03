import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./services/admin-guard.service";
import { AdminComponent } from "./components/admin.component";
import { AtualizacaoComponent } from "./components/atualizacao/atualizacao.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { ListagemComponent } from "./components/listagem/listagem.component";
import { MainGuard } from "../shared/guards/main.guard";

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate:[MainGuard,AdminGuard],
        children : [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            },
            {
                path: 'atualizacao/:lancamentoId',
                component: AtualizacaoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}