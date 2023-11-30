import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaOrdenesRoutingModule } from './busca-ordenes-routing.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { BuscaOrdenesComponent } from './busca-ordenes/busca-ordenes.component';

@NgModule({
  declarations: [
    BuscaOrdenesComponent
  ],
  imports: [
    CommonModule,
    BuscaOrdenesRoutingModule,
    TreeSelectModule,
    FieldsetModule,
    InputTextareaModule,
    TabViewModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    CalendarModule
  ]
})
export class BuscaOrdenesModule { }
