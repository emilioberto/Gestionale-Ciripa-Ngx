import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';

import { AttendanceService } from 'app/shared/services/attendance.service';
import { BaseComponent } from 'app/shared/components/base.component';
import { Settings } from 'app/shared/models/settings.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { KidService } from 'app/shared/services/kid.service';
import { Kid } from 'app/shared/models/kid.model';
import { Presence } from 'app/shared/models/presence.model';
import { SettingsService } from 'app/shared/services/settings.service';

@Component({
  selector: 'app-presences',
  templateUrl: './presences.component.html',
  styleUrls: ['./presences.component.scss']
})
export class PresencesComponent extends BaseComponent implements OnInit {

  @ViewChild('grid') private grid: GridComponent;

  public isPrintingPdf = false;
  public kid: Kid;
  public monthYearDescription: string;
  public settings: Settings;
  public gridView: GridDataResult;
  public summaryDate = new Date();
  public kidId: number;
  public monthsList = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private kidService: KidService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .pipe(take(1))
      .subscribe(settings => {
        this.settings = settings;
      });

    this.activatedRoute.params.subscribe(params => {
      this.kidId = +params['kidId'];
      this.loadPresenceSummary();
    });
  }

  private getMonthYearDescription(year: number, month: number): void {
    this.monthYearDescription = `${this.monthsList[month]} ${year}`;
  }

  public dailyHoursTotal(presence: Presence): number {
    let totale = 0;
    const morningEntry = new Date(presence.morningEntry);
    const morningExit = new Date(presence.morningExit);
    const eveningEntry = new Date(presence.eveningEntry);
    const eveningExit = new Date(presence.eveningExit);

    if (presence.morningEntry) {
      const minutiMattina =
        ((morningExit.getHours() * 60) + morningExit.getMinutes())
        - ((morningEntry.getHours() * 60) + morningEntry.getMinutes());

      totale += minutiMattina;
    }
    if (presence.eveningEntry) {
      const minutiPomeriggio =
        ((eveningExit.getHours() * 60) + eveningExit.getMinutes())
        - ((eveningEntry.getHours() * 60) + eveningEntry.getMinutes());

      totale += minutiPomeriggio;
    }

    totale = totale / 60;
    return parseFloat(totale.toFixed(1));
  }

  public totalHours(): number {
    const _self = this;
    const total = this.kid.presencesList.reduce(function (tot, current) {
      return tot + _self.dailyHoursTotal(current);
    }, 0);

    return parseFloat(total.toFixed(1));
  }

  public dailyAmount(presence: Presence): number {
    return parseFloat((this.dailyHoursTotal(presence) * this.settings.hourCost).toFixed(1));
  }

  public totalAmount(): number {
    return parseFloat((this.totalHours() * this.settings.hourCost).toFixed(1));
  }

  private loadGridData(): void {
    this.gridView = {
      data: this.kid.presencesList,
      total: this.kid.presencesList.length
    };
  }

  public getGridTitle(): string {
    // tslint:disable-next-line:max-line-length
    const parentFullName = `${this.kid.parentFirstName} ${this.kid.parentLastName}`;
    return `Riepilogo ${this.monthsList[this.summaryDate.getMonth()]} ${this.summaryDate.getFullYear()} - ${parentFullName}`;
  }

  public exportToPDF(grid: GridComponent): void {
    this.isPrintingPdf = true;
    setTimeout(() => {
      grid.saveAsPDF();
      this.isPrintingPdf = false;
    }, 400);
  }

  public getPdfName(): string {
    // tslint:disable-next-line:max-line-length
    const parentFullName = `${this.kid.parentFirstName}_${this.kid.parentLastName}`;
    return `Presenze_${parentFullName}_${this.monthsList[this.summaryDate.getMonth()]}${this.summaryDate.getFullYear()}.pdf`;
  }

  public onChange(value: Date): void {
    this.summaryDate = value;
    this.loadPresenceSummary();
  }

  public loadPresenceSummary(): void {
    this.kidService.getPresenceSummaryByKidId(this.kidId, this.summaryDate.getMonth(), this.summaryDate.getFullYear())
      .pipe(take(1))
      .subscribe(kid => {
        this.kid = kid;
        this.loadGridData();
      });
  }

  public save(): void {

  }
}
