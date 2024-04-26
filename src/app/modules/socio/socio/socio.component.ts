import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.scss']
})
export class SocioComponent implements OnInit{
  dropdownWidth: string = '19rem';
  dropdownHeight: string = '2.5rem'; 
  dropdownWidth1:string = '14rem';
  dropdownWidth2: string = '11.5rem'
  Especificacion:any[]=[
    {Especificaciones:'', Valor:''}
]

Seguimiento:any[]=[
  {id:1, Fecha:'25/5/2024', Hora:'10:00'},
  
  
]

estado:any
first = 0;

rows = 5;

constructor(){


}
  ngOnInit(): void {
    
  }
next() {
  this.first = this.first + this.rows;
  console.log(this.first)
}

prev() {
  this.first = this.first - this.rows;
  console.log(this.first)
}

reset() {
  this.first = 0;
  console.log(this.first)
}

pageChange(event:any) {
  this.first = event.first;
  
  this.rows = event.rows;
}




isLastPage(): boolean {
  return this.Seguimiento ? (this.first + this.rows) >= this.Seguimiento.length : true;
}

isFirstPage(): boolean {
  return this.Seguimiento ? this.first === 0 : true;
}


}
