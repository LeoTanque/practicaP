import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttRoutingModule } from './gantt-routing.module';
import { GanttComponent } from './gantt/gantt.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    GanttComponent
  ],
  imports: [
    CommonModule,
    GanttRoutingModule,
    ChartModule
  ]
})
export class GanttModule { }
