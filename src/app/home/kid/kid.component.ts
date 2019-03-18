import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';

import { combineLatest } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';

import { BaseComponent } from 'app/shared/components/base.component';
import { ContractType, PaymentMethod, Kid } from 'app/shared/models/kid.model';
import { NavigationService } from 'app/core/services/navigation.service';

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
  public submitted: boolean;

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
      { value: ContractType.Contract, text: ContractType[ContractType.Contract] },
      { value: ContractType.Hours, text: ContractType[ContractType.Hours] }
    ];
    this.paymentMethodList = [
      { value: PaymentMethod.Bonifico, text: PaymentMethod[PaymentMethod.Bonifico] },
      { value: PaymentMethod.Contanti, text: PaymentMethod[PaymentMethod.Contanti] }
    ];
  }

  ngOnInit() {
    this.submitted = false;

    combineLatest(this.activatedRoute.params, this.activatedRoute.data)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(([params, data]: [Params, Data]) => {
        this.kid = <Kid>this.activatedRoute.snapshot.data['kid'];
        this.generateForm();
        this.setDataOnForm();
      });
  }

  private generateForm(): void {
    this.editForm = this.fb.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: null,
      from: null,
      to: null,
      contractType: ['', Validators.required],
      notes: '',
      subscription: 0,
      subscriptionPaid: false,
      // Dati fatturazione
      billingData: this.fb.group({
        id: 0,
        parentFirstName: ['', Validators.required],
        parentLastName: ['', Validators.required],
        paymentMethod: ['', Validators.required],
        address: '',
        city: '',
        cap: '',
        province: '',
      })
    });
  }

  private setDataOnForm(): void {
    if (!!this.kid) {
      this.editForm.patchValue({
        id: this.kid.id,
        firstName: this.kid.firstName,
        lastName: this.kid.lastName,
        birthDate: !!this.kid.birthDate ? new Date(this.kid.birthDate) : null,
        from: !!this.kid.from ? new Date(this.kid.from) : null,
        to: !!this.kid.to ? new Date(this.kid.to) : null,
        contractType: this.kid.contractType,
        notes: this.kid.notes,
        // TODO Dati fatturazione
        subscription: this.kid.subscription,
        subscriptionPaid: this.kid.subscriptionPaid,
        billingData: this.kid.billingData ? this.kid.billingData : {
          id: 0,
          parentFirstName: '',
          parentLastName: '',
          paymentMethod: '',
          address: '',
          city: '',
          cap: '',
          province: '',
        }
      });
    }
  }

  public getFormControlByName(controlName: string): FormControl {
    return this.editForm.get(controlName) as FormControl;
  }

  public getDatiFatturazioneFormControlByName(controlName: string): FormControl {
    return (this.editForm.get('billingData') as FormGroup).get(controlName) as FormControl;
  }

  private getData(): Kid {
    return this.editForm.getRawValue() as Kid;
  }

  private save(): void {
    this.submitted = true;
    this.validateAllFormFields(this.editForm);
    this.applyOnAllControls(this.editForm, c => c.markAsTouched());
    if (this.editForm.valid) {
      const entity = this.getData();
      this.service.saveBambino(entity)
        .pipe(
          take(1)
        )
        .subscribe(res => {
          if (entity.id > 0) {
            this.router.navigate([this.router.url.split('?')[0]], { queryParams: { t: Math.random() } });
          } else {
            this.navigationService.navigateToKid(res);
          }
          this.addSuccessNotification(`Salvataggio effettuato`, `Ok`);
        });
    } else {
      this.addErrorNotification('Attenzione, compilare tutti i campi richiesti!', 'Ok');
    }
  }

  private delete(): void {
    const entity = this.getData();
    this.service.deleteBambino(entity.id)
      .pipe(
        take(1)
      )
      .subscribe(res => {
        this.addSuccessNotification(`Eliminazione effettuata`, `Ok`);
        this.navigationService.navigateToKidsList();
      });
  }

  private restore(): void {
    this.setDataOnForm();
  }
}
