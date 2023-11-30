import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaOrdenesComponent } from './busca-ordenes/busca-ordenes.component';

const routes: Routes = [
  {
    path: '', component:BuscaOrdenesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscaOrdenesRoutingModule { }
