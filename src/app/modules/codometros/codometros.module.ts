import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodometrosRoutingModule } from './codometros-routing.module';
import { CodometrosComponent } from './codometros/codometros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [
    CodometrosComponent
  ],
  imports: [
    CommonModule,
    CodometrosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    CheckboxModule,
    CardModule,
    InputTextareaModule
  ]
})
export class CodometrosModule { }
