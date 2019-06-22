import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule, MatButtonModule, MatSidenavModule,
  MatListModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatDialogModule
} from '@angular/material';

const MaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialModules
  ],
  exports: [
    ...MaterialModules
  ]
})
export class MaterialModule { }
