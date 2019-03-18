import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

import { BaseComponent } from 'app/shared/components/base.component';
import { Kid, ContractType } from 'app/shared/models/kid.model';
import { NavigationService } from 'app/core/services/navigation.service';

@Component({
  selector: 'app-kids-list',
  templateUrl: './kids-list.component.html',
  styleUrls: ['./kids-list.component.scss']
})
export class KidsListComponent extends BaseComponent implements OnInit {

  public gridView: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public bambinoList: Array<Kid> = [];
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

    this.bambinoList = <Array<Kid>>this.activatedRoute.snapshot.data['kidList'] || [];
    this.loadGridData();
  }

  private loadGridData(): void {
    this.gridView = {
      data: orderBy(this.bambinoList.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.bambinoList.length
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
    return contractType === ContractType.Contract ? 'Contratto' : 'Ore';
  }

  public getBambinoLink(id: number): string {
    return `/bambino/${id}`;
  }

  public getPresenceLink(id: number): string {
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
  saveListOptionsToLocalStorage(): void {
    localStorage.removeItem(this.kidListOptions);
    localStorage.setItem(this.kidListOptions, JSON.stringify({
      hiddenKid: this.hiddenKid,
      hiddenParent: this.hiddenParent
    }));
  }

  public add(): void {
    this.navigationService.navigateToNewKid();
  }
}
