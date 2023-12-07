import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard' ;
//import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
  {
    path:'', component:AppLayoutComponent, canActivate:[AuthGuard],
    children: [
      
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'ordenes', loadChildren: () => import('./modules/ordenes/ordenes.module').then(m => m.OrdenesModule),  }, 
      { path: 'buscaOrdenes', loadChildren: () => import('./modules/buscaOrdenes/busca-ordenes.module').then(m =>m.BuscaOrdenesModule),},
      { path:'creacion', loadChildren: () => import('./modules/creacion/creacion.module').then(m=>m.CreacionModule)}
  ]
  },
 
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
