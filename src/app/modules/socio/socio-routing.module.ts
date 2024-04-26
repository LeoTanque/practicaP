import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocioComponent } from './socio/socio.component';

const routes: Routes = [
  {
    path:'', component: SocioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocioRoutingModule { }
