import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { IntlModule } from '@progress/kendo-angular-intl';
import { MomentModule } from 'angular2-moment';

import { NavigationService } from 'app/core/services/navigation.service';

import '@progress/kendo-angular-intl/locales/it/all';
import localeIt from '@angular/common/locales/it';
import { AuthInterceptor } from 'app/core/services/authentication.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
