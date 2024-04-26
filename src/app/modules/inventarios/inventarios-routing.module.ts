import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventariosComponent } from './inventarios/inventarios.component';

const routes: Routes = [
  {
    path:'', component: InventariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
