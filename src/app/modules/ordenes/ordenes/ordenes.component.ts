import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

 cities!: any[];

  selectedCity: any;
  products!: any[];
  ngOnInit(): void {
    
  }
 

  
}
