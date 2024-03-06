import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgresComponent } from './progres/progres.component';
import { ProgressBarModule } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ProgresComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule,
    ToastModule
  ],
  exports: [
    ProgresComponent // Asegúrate de exportar el componente aquí
  ]
})
export class ProgresModule { }
