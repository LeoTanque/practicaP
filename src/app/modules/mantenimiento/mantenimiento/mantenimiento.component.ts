import { Component } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent {

  dropdownWidth: string = '23rem';
  dropdownWidth1:string = '17rem'
  Especificacion:any[]=[
    {Especificaciones:'', Valor:''}
]

Mantenimiento:any[]=[
  {Estado:'', Número:''}
]

checked: boolean = false;

value!:string

}
