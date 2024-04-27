import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  
  clientes: any[] = [];

  constructor(private servicioService: ServicioService){
   
  }


  ngOnInit(): void {
    this.obtenerClientes();
    console.log('khvjhv')
  }


  obtenerClientes(): void {
    this.servicioService.obtenerClientes().subscribe(
      (response) => {
        this.clientes = response.data; 
        console.log(response.Data)
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  


}
