import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { BaseComponent } from 'app/shared/components/base.component';
import { ContractType, PaymentMethod, Kid } from 'app/shared/models/kid.model';
import { NavigationService } from 'app/core/services/navigation.service';
import { KidService } from 'app/shared/services/kid.service';

@Component({
  selector: 'app-kid',
  templateUrl: './kid.component.html',
  styleUrls: ['./kid.component.scss']
})
export class KidComponent extends BaseComponent implements OnInit {

  public contractTypeList: Array<{ value: ContractType, text: string }>;
  public paymentMethodList: Array<{ value: PaymentMethod, text: string }>;
  public kid: Kid;
  public editForm: FormGroup;
  public submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: KidService,
    private fb: FormBuilder,
    private navigationService: NavigationService,
    snackBar: MatSnackBar
  ) {
    super(snackBar);
    this.contractTypeList = [
      { value: ContractType.Contratto, text: ContractType[ContractType.Contratto] },
      { value: ContractType.Ore, text: ContractType[ContractType.Ore] }
    ];
    this.paymentMethodList = [
      { value: PaymentMethod.Bonifico, text: 'Bonifico' },
      { value: PaymentMethod.Contanti, text: 'Contanti' }
    ];
  }

  ngOnInit() {
    this.generateForm();
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.getKidById(id).subscribe(
          kid => {
            this.kid = kid;
            this.setDataOnForm();
          },
          err => {
            this.addErrorNotification(err.message, 'Ok');
          }
        );
      }
    });
  }

  private generateForm(): void {
    this.editForm = this.fb.group({
      id: null,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fiscalCode: '',
      birthDate: null,
      from: null,
      to: null,
      contractType: ['', Validators.required],
      contractValue: 0,
      notes: '',
      subscription: 0,
      subscriptionPaid: false,
      // Dati fatturazione
      parentFirstName: ['', Validators.required],
      parentLastName: ['', Validators.required],
      parentFiscalCode: '',
      paymentMethod: ['', Validators.required],
      address: '',
      city: '',
      cap: '',
      province: '',
    });
  }

  private setDataOnForm(): void {
    if (!!this.kid) {
      const kid = Object.assign({}, this.kid);
      kid.from = kid.from ? new Date(kid.from) : null;
      kid.to = kid.to ? new Date(kid.to) : null;
      kid.birthDate = kid.birthDate ? new Date(kid.birthDate) : null;

      Object.keys(kid).forEach((key) => (kid[key] == null) && delete kid[key]);

      this.editForm.patchValue(kid);
    }
  }

  public getFormControlByName(controlName: string): FormControl {
    if (!this.editForm) {
      return null;
    }
    return this.editForm.get(controlName) as FormControl;
  }

  public getBillingDataFormControlByName(controlName: string): FormControl {
    if (!this.editForm) {
      return null;
    }
    return (this.editForm.get('billingData') as FormGroup).get(controlName) as FormControl;
  }

  private getData(): Kid {
    const kid = this.editForm.getRawValue() as Kid;
    if (!kid.id) {
      delete kid.id;
    }
    return kid;
  }

  private save(): void {
    this.submitted = true;
    this.validateAllFormFields(this.editForm);
    this.applyOnAllControls(this.editForm, c => c.markAsTouched());
    if (this.editForm.valid) {
      const entity = this.getData();
      if (entity.contractType !== ContractType.Contratto) {
        entity.contractValue = 0;
      }
      this.service.upsertKid(entity)
        .pipe(
          take(1)
        )
        .subscribe(
          res => {
            if (entity.id) {
              this.router.navigate([this.router.url.split('?')[0]], { queryParams: { t: Math.random() } });
            } else {
              this.navigationService.navigateToKid(res);
            }
            this.addSuccessNotification(`Salvataggio effettuato`, `Ok`);
          },
          err => {
            this.addErrorNotification(err.message, 'Ok');
          }
        );
    } else {
      this.addErrorNotification('Attenzione, compilare tutti i campi richiesti!', 'Ok');
    }
  }

  private delete(): void {
    const entity = this.getData();
    this.service.deleteKid(entity.id)
      .pipe(
        take(1),
      )
      .subscribe(
        res => {
          this.addSuccessNotification(`Eliminazione effettuata`, `Ok`);
          this.navigationService.navigateToKidsList();
        },
        err => {
          this.addErrorNotification(err.message, 'Ok');
        }
      );
  }

  private restore(): void {
    this.setDataOnForm();
  }
}
