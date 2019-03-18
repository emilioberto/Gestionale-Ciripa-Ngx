import { OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

export abstract class BaseComponent implements OnDestroy {
  public isAlive: boolean;

  constructor(
    public snackBar: MatSnackBar
  ) {
    this.isAlive = true;
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  protected addSuccessNotification(title: string, action: string, config: any = { panelClass: 'success-snack-bar' }) {
    this.snackBar.open(title || `Salvataggio effettuato`, `Ok`, config);
  }

  protected addErrorNotification(title: string, action: string, config: any = { panelClass: 'error-snack-bar' }) {
    this.snackBar.open(title || `Salvataggio effettuato`, `Ok`, config);
  }

  protected validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  protected applyOnAllControls(formGroup, f: (control: FormControl | FormGroup) => void): void {
    Object.values(formGroup.controls).forEach((control: FormControl | FormGroup) => {
      f(control);

      const childFormGroup = control as FormGroup;
      if (childFormGroup && childFormGroup.controls) {
        this.applyOnAllControls(childFormGroup, f);
      }
    });
  }
}
