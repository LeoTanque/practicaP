import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';
import { EntregaService } from 'src/app/services/entrega.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent {
 

  U_DocDatehasta: Date = new Date();
  dropdownWidth: string = '20rem';
 // refacciones!: any[];
  Entregas:any[]=[];
  refacciones:any[]=[
    {Chk:'', Serie:'', DocEntry:'', ItemCode:'', ItemName:'',Quantity:'', WhsCode:'', Existencia:'',Norma: '' }
  ]
  entregaForm!: FormGroup;

  constructor(private fb: FormBuilder, private entregaServices: EntregaService) {
    this.obtenerDatosDeEntrega();
  }

  ngOnInit(): void {
    this.entregaForm = this.fb.group({
      sucursalDesde: [''],
      sucursalHasta: [''],
      ordenTrabajoDesde: [''],
      ordenTrabajoHasta: [''],
      fechaDesde: ['1/28/2024'], 
      fechaHasta: [new Date()],
      articuloDesde: [''],
      articuloHasta: [''],
      almacenDesde: [''],
      almacenHasta: [''],
      //fechaEntrega: ['']
    });


  }

  submitForm() {
  console.log(this.entregaForm.value);
}


obtenerDatosDeEntrega(): void {
  this.entregaServices.datosDeEntrega1().subscribe(
    (response) => {
      //console.log('Datos de entrega obtenidos:', response.Data);
      this.Entregas = response.Data
      console.log('Datos de entrega obtenidos:', this.Entregas)
    },
    (error) => {
      console.error('Error al obtener los datos de entrega:', error);
    }
  );
}


}
