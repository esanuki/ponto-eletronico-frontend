import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogarComponent } from "./component/logar.component";
import { LoginComponent } from "./component/login/login.component";

export const loginRouter: Routes = [
    {
        path: 'login',
        component: LogarComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(loginRouter)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}