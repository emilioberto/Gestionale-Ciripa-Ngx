import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { IntlModule } from '@progress/kendo-angular-intl';
import { MomentModule } from 'angular2-moment';

import { NavigationService } from 'app/core/services/navigation.service';

import '@progress/kendo-angular-intl/locales/it/all';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IntlModule,
    MomentModule
  ],
  exports: [
    MomentModule
  ],
  providers: [
    NavigationService,
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ]
})
export class CoreModule { }
