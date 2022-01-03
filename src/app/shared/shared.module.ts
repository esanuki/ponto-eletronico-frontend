import { CommonModule } from "@angular/common";
import { ngModuleJitUrl } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { MascaraDirective } from "./directives/mascara.directive";
import { DataPipe } from './pipes/data.pipe';
import { TipoPipe } from './pipes/tipo.pipe';

@NgModule({
    declarations: [
        MascaraDirective,
        DataPipe,
        TipoPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MascaraDirective,
        DataPipe,
        TipoPipe
    ]
})
export class SharedModule {}