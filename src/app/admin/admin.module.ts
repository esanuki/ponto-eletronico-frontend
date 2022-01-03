import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select'
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpUtilService } from '../shared/services/http-util.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { AdminComponent } from './components/admin.component';
import { FuncionarioService } from '../shared/services/funcionario.service';
import { ConfirmarDialog, ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoService } from '../shared/services/lancamento.service';
import { PtBrMatPaginatorIntl } from '../shared/utils/pt-br-paginator.intl';
import { AdminGuard } from './services/admin-guard.service';




@NgModule({
  declarations: [
    AdminComponent,
    ListagemComponent, 
    CadastroComponent, 
    ConfirmarDialog,
    AtualizacaoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,

    AdminRoutingModule
  ],
  providers: [
    FuncionarioService,
    LancamentoService,
    MatPaginatorIntl,
    HttpUtilService,
    { provide: MAT_DIALOG_DATA, useValue: 'pt-BR'},
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
    AdminGuard
  ]
})
export class AdminModule { }
