import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.scss']
})
export class CreacionComponent {
  ingredient!: any;
  cities!: any[];
  submitted: boolean = false;
  miFormulario!: FormGroup;
  productDialog: boolean = false;
  terceros:boolean=false;
  recomendaciones:boolean = false;
  refacciones: boolean = false;
  manoDeObra:boolean = false;
  product!: any;
  productos!: any[];
   selectedCity: any;
   
   products!: any[];
   
   constructor(private fb: FormBuilder) { }

   ngOnInit(): void {
    this.inicializarFormulario();
   }


   private inicializarFormulario(): void {
    this.miFormulario = this.fb.group({
      cliente: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      contrato: ['', Validators.required],
      oc_ot: ['', Validators.required],
    });
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
