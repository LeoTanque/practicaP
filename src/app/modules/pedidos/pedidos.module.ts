import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FilterPipe } from 'src/app/services/filter.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ScrollerModule } from 'primeng/scroller';


@NgModule({
  declarations: [
    PedidosComponent,
    FilterPipe,
     
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    PaginatorModule,
    DialogModule,
    TableModule,
    ScrollerModule
  ]
})
export class PedidosModule { }
