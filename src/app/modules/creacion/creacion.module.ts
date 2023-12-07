import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreacionRoutingModule } from './creacion-routing.module';
import { CreacionComponent } from './creacion/creacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeSelectModule } from 'primeng/treeselect';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    CreacionComponent
  ],
  imports: [
    CommonModule,
    CreacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    CheckboxModule,
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
    InputNumberModule,
    
  ]
})
export class CreacionModule { }
