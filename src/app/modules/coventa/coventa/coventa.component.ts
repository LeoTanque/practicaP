import { Component } from '@angular/core';

@Component({
  selector: 'app-coventa',
  templateUrl: './coventa.component.html',
  styleUrls: ['./coventa.component.scss']
})
export class CoventaComponent {


  dropdownWidth: string = '18rem';
  Articulo:any[]=[
    {Proveedor:'', Nombre:'', OrdenCompra: '', Total:''}
]
}
