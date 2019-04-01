import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

import { BaseComponent } from 'app/shared/components/base.component';
import { Kid, ContractType } from 'app/shared/models/kid.model';
import { NavigationService } from 'app/core/services/navigation.service';
import { KidService } from 'app/shared/services/kid.service';

@Component({
  selector: 'app-kids-list',
  templateUrl: './kids-list.component.html',
  styleUrls: ['./kids-list.component.scss']
})
export class KidsListComponent extends BaseComponent implements OnInit {

  public gridView: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public kidsList: Array<Kid> = [];
  public hiddenKid = false;
  public hiddenParent = false;
  public kidListSortKey = 'kidListSort';
  public kidListOptions = 'kidListOptions';
  public sort: SortDescriptor[] = [{
    field: 'nome',
    dir: 'asc'
  }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private kidService: KidService,
    snackBar: MatSnackBar,
  ) {
    super(snackBar);
  }

  ngOnInit() {
    const savedSortDescriptor = localStorage.getItem(this.kidListSortKey);
    this.sort = !!savedSortDescriptor ? JSON.parse(savedSortDescriptor) : this.sort;

    const savedListOptions = localStorage.getItem(this.kidListOptions);
    this.hiddenKid = !!savedListOptions ? JSON.parse(savedListOptions).hiddenBambino : false;
    this.hiddenParent = !!savedListOptions ? JSON.parse(savedListOptions).hiddenGenitore : false;

    this.kidsList = <Array<Kid>>this.activatedRoute.snapshot.data['kidList'] || [];
    this.kidService.getBambinoList().subscribe(
      kidsList => {
        this.kidsList = kidsList;
        this.loadGridData();
      },
      err => {
        this.addErrorNotification(err.message, 'Ok');
      }
    );
  }

  private loadGridData(): void {
    this.gridView = {
      data: orderBy(this.kidsList.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.kidsList.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridData();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    localStorage.setItem(this.kidListSortKey, JSON.stringify(this.sort));
    this.loadGridData();
  }

  public getContractTypeDescription(contractType: ContractType): string {
    return contractType === ContractType.Contratto ? 'Contratto' : 'Ore';
  }

  public navigateToKid(id: number): void {
    return this.navigationService.navigateToKid(id);
  }

  public navigateToPresences(id: number): string {
    const today = new Date();
    return `/presenze/${id}/${today.getFullYear()}/${today.getMonth()}`;
  }

  public restoreColumns(): void {
    this.hiddenKid = false;
    this.hiddenParent = false;
    this.saveListOptionsToLocalStorage();
  }

  public hideBambinoColumn(): void {
    this.hiddenKid = true;
    this.hiddenParent = false;
    this.saveListOptionsToLocalStorage();
  }

  public hideGenitoreColumn(): void {
    this.hiddenParent = true;
    this.hiddenKid = false;
    this.saveListOptionsToLocalStorage();
  }

  public saveListOptionsToLocalStorage(): void {
    localStorage.removeItem(this.kidListOptions);
    localStorage.setItem(this.kidListOptions, JSON.stringify({
      hiddenKid: this.hiddenKid,
      hiddenParent: this.hiddenParent
    }));
  }

  public createKid(): void {
    this.navigationService.navigateToNewKid();
  }
}
