import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { takeWhile, take } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';

import { KidService } from 'app/shared/services/kid.service';
import { BaseComponent } from 'app/shared/components/base.component';
import { Attendance, Presence } from 'app/shared/models/attendance.models';
import { AttendanceService } from 'app/shared/services/attendance.service';
import { requiredIfSibling, isValidTime } from 'app/shared/validators/CustomValidators';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent extends BaseComponent implements OnInit {

  public attendance: Attendance;
  public gridView: GridDataResult;
  public editForm: FormGroup;

  constructor(
    private router: Router,
    private kidService: KidService,
    private service: AttendanceService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.generateForm();
    // this.loadGridData(this.attendance.presencesList);
    this.setDataOnForm();


    this.editForm.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(_ => this.applyOnAllControls(this.editForm, c => c.updateValueAndValidity({ emitEvent: false })));
  }

  private setDataOnForm(): void {
    if (this.attendance) {
      this.editForm.patchValue(this.attendance);
    }
  }

  public get presenzaList(): FormArray {
    return this.editForm.get('attendancesList') as FormArray;
  }

  public morningEntryFormControl(rowIndex: number): FormControl {
    return this.presenzaList.controls[rowIndex].get('morningEntry') as FormControl;
  }

  public morningExitFormControl(rowIndex: number): FormControl {
    if (this.presenzaList.length) {
      return this.presenzaList.controls[rowIndex].get('morningExit') as FormControl;
    }
    return null;
  }

  public eveningEntryFormControl(rowIndex: number): FormControl {
    if (this.presenzaList.length) {
      return this.presenzaList.controls[rowIndex].get('eveningEntry') as FormControl;
    }
  }

  public eveningExitFormControl(rowIndex: number): FormControl {
    if (this.presenzaList.length) {
      return this.presenzaList.controls[rowIndex].get('eveningExit') as FormControl;
    }
    return null;
  }

  public kidIdFormControl(rowIndex: number): FormControl {
    if (this.presenzaList.length) {
      return this.presenzaList.controls[rowIndex].get('kidId') as FormControl;
    }
    return null;
  }

  public idFormControl(rowIndex: number): FormControl {
    return this.editForm.get('id') as FormControl;
  }

  private generateForm(): void {
    this.editForm = this.fb.group({
      id: 0,
      date: null,
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

  private loadGridData(presencesList: Array<Presence>): void {
    this.gridView = {
      data: presencesList,
      total: presencesList.length
    };

    const presencesListFormGroupList = presencesList.map(() => this.generatePresenceFormGroup());
    const presencesListFormArray = this.fb.array(presencesListFormGroupList);
    this.editForm.setControl('presencesList', presencesListFormArray);
  }

  public onChange(value: Date): void {
    const noTimeDate = new Date(value.setHours(0, 0, 0, 0));
    this.router.navigate(['appello'], { queryParams: { data: noTimeDate.toISOString() } });
  }

  private getData(): Attendance {
    return this.editForm.getRawValue() as Attendance;
  }

  private save(): void {
    this.validateAllFormFields(this.editForm);
    this.applyOnAllControls(this.editForm, c => c.updateValueAndValidity({ emitEvent: false }));
    this.applyOnAllControls(this.editForm, c => {
      c.markAsTouched();
      c.updateValueAndValidity({ emitEvent: false });
    });
    if (this.editForm.valid) {
      const entity = this.getData();
      this.service.saveAttendance(entity)
        .pipe(
          take(1)
        )
        .subscribe(res => {
          this.onChange(this.attendance.date);
          this.addSuccessNotification(`Salvataggio effettuato`, `Ok`);
        });
    } else {
      this.addErrorNotification('Attenzione, sono presenti orari non validi e/o mancanti!', 'Ok');
    }
  }

  private delete(): void {
    const entity = this.getData();
    this.service.deleteAttendance(entity.id)
      .pipe(
        take(1)
      )
      .subscribe(res => {
        this.addSuccessNotification(`Eliminazione effettuata`, `Ok`);
      });
  }

  private restore(): void {
    this.setDataOnForm();
  }
}
