import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.scss']
})
export class EntregaComponent {


  U_DocDatehasta: Date = new Date();
  dropdownWidth: string = '20rem';
 // refacciones!: any[];

  refacciones:any[]=[
    {Chk:'', Series:'', OT:'', Articulo:'', Nombre:'',Cantidad:'', Almacen:'', Existencia:'',Norma: '' }
  ]
  entregaForm!: FormGroup;

  constructor(private fb: FormBuilder, private creacionService: CreacionOrdenesService) {}

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
}
