import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { KidService } from 'app/shared/services/kid.service';

@NgModule({
  declarations: [],
  providers: [
    KidService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
  ]
})
export class SharedModule { }
