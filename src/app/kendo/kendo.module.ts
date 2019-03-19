import { NgModule } from '@angular/core';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule, TimePickerModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { IntlModule } from '@progress/kendo-angular-intl';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';

@NgModule({
    imports: [
        ButtonsModule,
        DateInputsModule,
        InputsModule,
        LabelModule,
        FormsModule,
        ReactiveFormsModule,
        DropDownsModule,
        IntlModule,
        GridModule,
        TimePickerModule,
        PDFModule,
    ],
    exports: [
        ButtonsModule,
        DateInputsModule,
        InputsModule,
        LabelModule,
        FormsModule,
        ReactiveFormsModule,
        DropDownsModule,
        IntlModule,
        GridModule,
        TimePickerModule,
        PDFModule,
    ]
})
export class KendoModule { }

