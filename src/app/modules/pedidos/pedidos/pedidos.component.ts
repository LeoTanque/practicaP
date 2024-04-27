import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pagination } from 'src/app/services/pagination';
import { Productos } from 'src/app/services/productos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  productos: Productos[] = [ 
    { name: 'Filas', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 },
    { name: 'Adidass', imageUrl: '../../../../assets/fondo1.jpg', precio: 100  },
    { name: 'CR_V', imageUrl: '../../../../assets/fondo1.jpg', precio: 400  },
    { name: 'PILOT', imageUrl: '../../../../assets/fondo1.jpg', precio: 300  },
    { name: 'ODDYSSEY', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'RIDGELINE', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'FIT', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'CIVIC', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'ACCORD', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'ACCESORIOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'LLANTAS', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'TODOS', imageUrl: '../../../../assets/fondo1.jpg', precio: 500  },

   
  ];

  productosOriginales: Productos[] = [];
  productosPaginados: Productos[] = [];
  totalRegistros: number;
  paginaActual: number = 1;
  productosPorPagina: number = 9;
  filtroTexto: string = '';


  currentPage: number = 0;
  itemsPerPage: number = 9;
  totalPages!: number ;

  constructor() {
    this.totalRegistros = this.productos.length;
    //this.cargarProductos({ first: 0, rows: 9 });
    
    this.productosOriginales = [...this.productos];
    this.cargarProductos({ first: 0, rows: this.productosPorPagina });
  }

  ngOnInit(): void {
    
  }

  cargarProductos(event: LazyLoadEvent) {
    const startIndex = event.first || 0;
    const endIndex = startIndex + this.productosPorPagina;
    
    let productosFiltrados = this.productosOriginales.filter(producto =>
      Object.values(producto).some(propiedad =>
        propiedad.toString().toLowerCase().includes(this.filtroTexto.toLowerCase())
      )
    );
  
    this.totalRegistros = productosFiltrados.length;
  
    this.productosPaginados = productosFiltrados.slice(startIndex, endIndex);
    this.paginaActual = Math.floor(startIndex / this.productosPorPagina) + 1;
  }
  

  filtrarProductos() {
    if (this.filtroTexto.trim() === '') {
      // Si el filtro está vacío, restaura los productos originales y carga la primera página
      this.productos = [...this.productosOriginales];
      this.cargarProductos({ first: 0, rows: this.productosPorPagina });
    } else {
      // Si hay texto en el filtro, aplica el filtro a todos los productos y carga la primera página
      this.productos = this.productosOriginales.filter(producto =>
        Object.values(producto).some(propiedad =>
          propiedad.toString().toLowerCase().includes(this.filtroTexto.toLowerCase())
        )
      );
      this.cargarProductos({ first: 0, rows: this.productosPorPagina });
    }
  }

    irPaginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarProductos({ first: (this.paginaActual - 1) * this.productosPorPagina, rows: this.productosPorPagina });
    }
  }

  irPaginaSiguiente() {
    const ultimaPagina = Math.ceil(this.productosOriginales.length / this.productosPorPagina);
    if (this.paginaActual < ultimaPagina) {
      this.paginaActual++;
      this.cargarProductos({ first: (this.paginaActual - 1) * this.productosPorPagina, rows: this.productosPorPagina });
    }
  }
 
}
