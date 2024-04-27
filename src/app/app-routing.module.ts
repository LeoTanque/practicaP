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
{ path: 'socio', loadChildren: () => import('./modules/socio/socio.module').then(m => m.SocioModule) }, 
{ path: 'compra', loadChildren: () => import('./modules/compra/compra.module').then(m => m.CompraModule) }, 
{ path: 'ventas', loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule) },
{ path: 'inventarios', loadChildren: () => import('./modules/inventarios/inventarios.module').then(m => m.InventariosModule) }, 
{ path: 'pedidos', loadChildren: () => import('./modules/pedidos/pedidos.module').then(m => m.PedidosModule) }, 
{ path: 'clientes', loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule) },


{ path: 'entrega', loadChildren: () => import('./modules/entrega/entrega.module').then(m => m.EntregaModule) },
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
