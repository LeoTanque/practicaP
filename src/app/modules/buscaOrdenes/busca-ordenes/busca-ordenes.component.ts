import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';

@Component({
  selector: 'app-busca-ordenes',
  templateUrl: './busca-ordenes.component.html',
  styleUrls: ['./busca-ordenes.component.scss']
})
export class BuscaOrdenesComponent implements OnInit {
 
  ordenes: any[] = [];
  U_DocDatedesde: Date = new Date('2023-12-27T16:43:50.3414569-05:00')
  //U_DocDatedesde: Date = new Date('yyyy-MM-dd');
  U_DocDatehasta: Date = new Date();
  filtroGlobal: string = '';
constructor(private creacionOrdenesService:CreacionOrdenesService, private route: Router){}

  ngOnInit(): void {

    this.onFechaSeleccionada();

//this.obtenerOrdenes();
   
  }

   

  onFechaSeleccionada(){
    const parametros = {
      DocEntry: 0,
      //U_DocDatedesde: "2024-01-16T16:43:50.3414569-05:00",
      U_DocDatedesde: this.U_DocDatedesde.toISOString(),
      U_DocDatehasta: this.U_DocDatehasta.toISOString()
    };


    this.creacionOrdenesService.obtenerOrdenes(parametros).subscribe(
      (response: any) => {
        // Verificar si la respuesta tiene la propiedad 'data'
        if (response && response.data && Array.isArray(response.data)) {
          // Almacenar los datos en la propiedad 'ordenes'
          this.ordenes = response.data;
          console.log(this.ordenes);
        } else {
          console.error('La respuesta no tiene la estructura esperada', response);
          // Puedes manejar el caso en el que la respuesta no tenga la estructura esperada
        }
      },
      error => {
        console.error('Error al obtener las órdenes', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }




  editarOrden(docEntry: number): void {
    // Redirige a la ruta '/ordenes' con el parámetro 'docEntry'
    this.route.navigate(['/ordenes'], { queryParams: { docEntry } });
  }


  eliminarOrden(DocEntry: number) {
    // Llama al servicio para eliminar la orden por su id
    this.creacionOrdenesService.eliminarOrden(DocEntry).subscribe(
      response => {
        // Maneja la respuesta si es necesario
        console.log('Orden eliminada con éxito', response);

        // Actualiza la lista de órdenes después de la eliminación
        this.onFechaSeleccionada();
      },
      error => {
        // Maneja el error si es necesario
        console.error('Error al eliminar la orden', error);
      }
    );
  }


  }

  




