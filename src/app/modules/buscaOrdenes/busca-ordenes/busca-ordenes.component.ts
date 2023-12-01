import { Component } from '@angular/core';

@Component({
  selector: 'app-busca-ordenes',
  templateUrl: './busca-ordenes.component.html',
  styleUrls: ['./busca-ordenes.component.scss']
})
export class BuscaOrdenesComponent {

  ordenes =[ {
    tipo: 'Mantenimiento Preventivo 1000',
    serie: 'HMO',
    numDoc: 1028830,
    cardCode: 'CLN00099',
    cliente: 'CITROFRUST S.A. DE C.V. ',
    fecha: '18-10-2023',
    estado: 'Diagnostico',
    prioridad: 'alta',
    
  },
  {
    tipo: 'Mantenimiento Preventivo 2400',
    serie: 'HMO',
    numDoc: 1028830,
    cardCode: 'CLN00099',
    cliente: 'CITROFRUST S.A. DE C.V. ',
    fecha: '18-10-2023',
    estado: 'Diagnostico',
    prioridad: 'alta',
  }]
}
