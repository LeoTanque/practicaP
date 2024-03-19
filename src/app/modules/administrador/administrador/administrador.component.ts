import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {


  dropdownWidth: string = '23rem';
  dropdownWidth1:string = '17rem'
  Especificacion:any[]=[
    {Especificaciones:'', Valor:''}
]

Mantenimiento:any[]=[
  {Estado:'', Número:''}
]

checked: boolean = false;
}
