import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  
  clientes: any[] = [];
  errorMessage: string = '';
  client: boolean= false;
 
 filtroGlobal: string = '';
  cardNameValue: any;

  lastTouchTime: number = 0;
  touchTimeout: any;
  cardCodeValue: any;
  ListNumValue:any;
  constructor(private servicioService: ServicioService){
   
  }


  ngOnInit(): void {
    this.obtenerClientes();
   
  }


  

  obtenerClientes(): void {
    this.servicioService.obtenerClientes().subscribe(
      (response) => {
        this.clientes = response.Data;
        console.log(this.clientes);
     
      },
      (error) => {
        this.errorMessage = 'Error al obtener los clientes: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  
  
  openNew3() {
 
    this.client = true
   }


   onrowTouchEnd(event: TouchEvent, cliente: any) {
    const now = new Date().getTime();
    const timeSinceLastTouch = now - this.lastTouchTime;
    if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
      // Doble toque detectado
      this.onrowDobleClick(cliente);
      clearTimeout(this.touchTimeout);
    } else {
      // Primer toque
      this.lastTouchTime = now;
      this.touchTimeout = setTimeout(() => {
        clearTimeout(this.touchTimeout);
      }, 300);
    }
  }

   onrowDobleClick(cliente: any) {
    this.cardNameValue = cliente.CardName;
    this.cardCodeValue = cliente.CardCode;
    this.ListNumValue = cliente.ListNum
  console.log(this.cardNameValue, this.cardCodeValue)
  console.log('valor del ListNum del cliente seleccionado', this.ListNumValue)
  this.client=false
    }


    hideDialog() {
      this.client = false
    }

}
