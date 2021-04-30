import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailCheck]'
})
export function forbiddenEmailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    var regExp: RegExp = new RegExp("[')(&*$%#@!]");
    const forbidden = regExp.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
