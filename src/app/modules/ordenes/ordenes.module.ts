import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomFilterPipe } from 'src/app/services/pipe';


import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    OrdenesComponent,
    //CustomFilterPipe,
    
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeSelectModule,
    FieldsetModule,
    InputTextareaModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    RadioButtonModule,
    ToolbarModule,
    DialogModule,
    //ConfirmDialogModule,
    InputNumberModule,
    CheckboxModule,
    FileUploadModule
  ]
})
export class OrdenesModule { }
