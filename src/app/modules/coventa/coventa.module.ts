import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoventaRoutingModule } from './coventa-routing.module';
import { CoventaComponent } from './coventa/coventa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

@NgModule({ 
  declarations: [
    CoventaComponent
  ],
  imports: [
    CommonModule,
    CoventaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    CheckboxModule,
    CardModule,
    InputTextareaModule,
    PanelModule,
    TabViewModule
  ]
})
export class CoventaModule { }
