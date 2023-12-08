import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  ingredient!: any;
 cities!: any[];
 submitted: boolean = false;

 productDialog: boolean = false;
 terceros:boolean=false;
 recomendaciones:boolean = false;
 refacciones: boolean = false;
 manoDeObra:boolean = false;
 product!: any;
 productos!: any[];
  selectedCity: any;
  data: any[] = [];
  products!: any[];
  tiposTrabajo: any[] = [];
 listaSeries:any[]=[];
listaCordinadores: any[]=[];
listaTecnicos:any[]=[];
listaTrabajos:any[]=[];
listaFallos:any[]=[];
miFormulario!: FormGroup;
dropdownWidth: string = '20rem';
dropdownWidth1: string = '15rem';


constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){
  this.miFormulario = this.fb.group({
    fueraDeServicio: new FormControl('') // Puedes inicializarlo con un valor predeterminado si es necesario
  });
}


  ngOnInit(): void {
    this.cargarDatos()
  }

 

  cargarDatos() {
    this.creacionOrdenesService.listarCombos().subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.data = response.data;
          console.log(response.data);
          this.tiposTrabajo = response.data.listaTipos;
          this.listaSeries = response.data.listaSeries;
          this.listaCordinadores = response.data.listaCordinadores;
          //console.log(response.data.listaCordinadores);
          this.listaTecnicos = response.data.listaTecnicos;
          this.listaTrabajos = response.data.listaTrabajos;
          this.listaFallos = response.data.listaFallos;
        
        } else {
          console.error('Error al obtener datos del API');
        }
      },
      (error) => {
        console.error('Error de conexión al API');
      }
    );
  }
 
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.terceros = true;
}

openNew1() {
  this.product = {};
  this.submitted = false;
 // this.productDialog = true;
  this.terceros = true;
}

openNew2() {
  this.product = {};
  this.submitted = false;
 this.recomendaciones = true
}

openNew3() {
  this.product = {};
  this.submitted = false;
 this.refacciones = true
}

openNew4() {
  this.product = {};
  this.submitted = false;
 this.manoDeObra = true
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  this.terceros = false
  this.manoDeObra = false;
  this.refacciones = false;
  this.recomendaciones = false
}

mTerceros() {
  //this.productDialog = false;
 // this.submitted = false;
  this.terceros = false
  this.manoDeObra = false
}

}
