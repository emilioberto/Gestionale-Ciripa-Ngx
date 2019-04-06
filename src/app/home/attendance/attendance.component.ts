import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { takeWhile, take } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';
import * as moment from 'moment';

import { KidService } from 'app/shared/services/kid.service';
import { BaseComponent } from 'app/shared/components/base.component';
import { AttendanceService } from 'app/shared/services/attendance.service';
import { requiredIfSibling, isValidTime } from 'app/shared/validators/CustomValidators';
import { Presence } from 'app/shared/models/presence.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent extends BaseComponent implements OnInit, OnDestroy {

  public presencesList: Presence[];
  public gridView: GridDataResult;
  public editForm: FormGroup;
  public subscription: Subscription;
  public attendanceDate: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private kidService: KidService,
    private service: AttendanceService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.attendanceDate = moment().locale('it').format('YYYY-MM-DD');
    this.generateForm();
    this.kidService.getPresencesByDate(this.attendanceDate)
      .pipe(take(1))
      .subscribe(
        res => {
          this.presencesList = res;
          this.loadGridData();
        },
        err => this.addErrorNotification(err.message, 'OK')
      );

    this.setDataOnForm();
    this.editForm.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(_ => this.applyOnAllControls(this.editForm, c => c.updateValueAndValidity({ emitEvent: false })));
  }

  ngOnDestroy() {
  }

  private setDataOnForm(): void {
    if (this.presencesList) {
      this.editForm.patchValue(this.presencesList);
    }
  }

  public get presencesListFormArray(): FormArray {
    return this.editForm.get('presencesList') as FormArray;
  }

  public morningEntryFormControl(rowIndex: number): FormControl {
    return this.presencesListFormArray.controls[rowIndex].get('morningEntry') as FormControl;
  }

  public morningExitFormControl(rowIndex: number): FormControl {
    if (this.presencesListFormArray.length) {
      return this.presencesListFormArray.controls[rowIndex].get('morningExit') as FormControl;
    }
    return null;
  }

  public eveningEntryFormControl(rowIndex: number): FormControl {
    if (this.presencesListFormArray.length) {
      return this.presencesListFormArray.controls[rowIndex].get('eveningEntry') as FormControl;
    }
  }

  public eveningExitFormControl(rowIndex: number): FormControl {
    if (this.presencesListFormArray.length) {
      return this.presencesListFormArray.controls[rowIndex].get('eveningExit') as FormControl;
    }
    return null;
  }

  public kidIdFormControl(rowIndex: number): FormControl {
    if (this.presencesListFormArray.length) {
      return this.presencesListFormArray.controls[rowIndex].get('kidId') as FormControl;
    }
    return null;
  }

  public idFormControl(rowIndex: number): FormControl {
    return this.editForm.get('id') as FormControl;
  }

  private generateForm(): void {
    this.editForm = this.fb.group({
      id: 0,
      date: new Date(this.attendanceDate),
      presencesList: this.fb.array([])
    });
  }

  private generatePresenceFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      bambinoId: 0,
      morningEntry: [null, requiredIfSibling('uscitaMattina')],
      morningExit: [null, Validators.compose([requiredIfSibling('morningEntry'), isValidTime('morningEntry')])],
      eveningEntry: [null, Validators.compose([requiredIfSibling('eveningExit'), isValidTime('morningExit')])],
      eveningExit: [null, Validators.compose([requiredIfSibling('eveningEntry'), isValidTime('eveningEntry')])],
    });
  }

  private loadGridData(): void {
    this.gridView = {
      data: this.presencesList,
      total: this.presencesList.length
    };

    const presencesListFormGroupList = this.presencesList.map(() => this.generatePresenceFormGroup());
    const presencesListFormArray = this.fb.array(presencesListFormGroupList);
    this.editForm.setControl('presencesList', presencesListFormArray);
  }

  public onChange(value: Date): void {
    // this.router.navigate(['appello'], { queryParams: { data: value.toISOString() } });
  }

  private getData(): any {
    return this.editForm.getRawValue() as any;
  }

  private save(): void {
    // this.validateAllFormFields(this.editForm);
    // this.applyOnAllControls(this.editForm, c => c.updateValueAndValidity({ emitEvent: false }));
    // this.applyOnAllControls(this.editForm, c => {
    //   c.markAsTouched();
    //   c.updateValueAndValidity({ emitEvent: false });
    // });
    // if (this.editForm.valid) {
    //   const entity = this.getData();
    //   this.service.saveAttendance(entity)
    //     .pipe(
    //       take(1)
    //     )
    //     .subscribe(res => {
    //       // this.onChange(this.attendanceDate);
    //       this.addSuccessNotification(`Salvataggio effettuato`, `Ok`);
    //     });
    // } else {
    //   this.addErrorNotification('Attenzione, sono presenti orari non validi e/o mancanti!', 'Ok');
    // }
  }

  private delete(): void {
    // const entity = this.getData();
    // this.service.deleteAttendance(entity.id)
    //   .pipe(
    //     take(1)
    //   )
    //   .subscribe(res => {
    //     this.addSuccessNotification(`Eliminazione effettuata`, `Ok`);
    //   });
  }

  private restore(): void {
    this.setDataOnForm();
  }
}
