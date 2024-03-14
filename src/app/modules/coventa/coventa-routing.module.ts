import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoventaComponent } from './coventa/coventa.component';

const routes: Routes = [
  {
    path: '', component:CoventaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoventaRoutingModule { }
