import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionComponent } from './creacion/creacion.component';

const routes: Routes = [
  {
    path:'', component:CreacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
