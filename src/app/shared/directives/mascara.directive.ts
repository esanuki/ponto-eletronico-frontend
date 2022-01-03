import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[mascara]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MascaraDirective,
      multi: true
    }
  ]
})
export class MascaraDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any
 
  @Input('mascara') mascara: string;
  
  constructor(
    private ef: ElementRef
  ) { }

  writeValue(obj: any): void {
    if (obj)
      this.ef.nativeElement.value = this.aplicarMascara(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any){
    let valor: string = $event.target.value.replace(/\D/g, '');

    if ($event.keyCode === 8){
      this.onChange(valor);
      return;
    }

    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length)
      this.onChange(valor);

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.mascara.length) return;

    this.onChange('');
    $event.target.value = '';
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  aplicarMascara(valor: string) {
    valor = valor.replace(/\D/g, '');
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i)))) {
        valor += this.mascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valorMask.indexOf('_') > -1)
      valor = valor.substring(0, valor.indexOf('_'));

    return valor;

  }

}
