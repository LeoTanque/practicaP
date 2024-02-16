import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaRoutingModule } from './entrega-routing.module';
import { EntregaComponent } from './entrega/entrega.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    EntregaComponent
  ],
  imports: [
    CommonModule,
    EntregaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    CheckboxModule,
    CardModule
  ]
})
export class EntregaModule { }
