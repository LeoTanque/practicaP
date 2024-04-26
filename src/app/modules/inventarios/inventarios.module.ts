import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventariosRoutingModule } from './inventarios-routing.module';
import { InventariosComponent } from './inventarios/inventarios.component';


@NgModule({
  declarations: [
    InventariosComponent
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule
  ]
})
export class InventariosModule { }
