import { Component, OnInit } from '@angular/core';

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
 product!: any;
 productos!: any[];
  selectedCity: any;
  
  products!: any[];
  
  ngOnInit(): void {
    
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
hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  this.terceros = false
}


}
