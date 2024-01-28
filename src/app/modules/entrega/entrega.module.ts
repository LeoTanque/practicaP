import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaRoutingModule } from './entrega-routing.module';
import { EntregaComponent } from './entrega/entrega.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


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
  ]
})
export class EntregaModule { }
