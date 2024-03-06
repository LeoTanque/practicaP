import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodometrosComponent } from './codometros/codometros.component';

const routes: Routes = [
  {
    path: '', component:CodometrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodometrosRoutingModule { }
