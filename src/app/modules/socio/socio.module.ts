import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocioRoutingModule } from './socio-routing.module';
import { SocioComponent } from './socio/socio.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [ 
    SocioComponent
  ],
  imports: [
    CommonModule,
    SocioRoutingModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    PanelModule,
    TableModule,
    TabViewModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
    FieldsetModule,
    InputTextareaModule
  ]
})
export class SocioModule { }
