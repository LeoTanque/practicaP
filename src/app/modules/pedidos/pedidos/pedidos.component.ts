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

  productos: any[] = [ 
    { name: 'Filas', imageUrl: '../../../../assets/fondo1.jpg', precio: 200 },
    { name: 'Adidass', imageUrl: '../../../../assets/fondo1.jpg', precio: 100  },
    { name: 'CR_V', imageUrl: '../../../../assets/fondo1.jpg', precio: 400  },
    { name: 'PILOT', imageUrl: '../../../../assets/fondo1.jpg', precio: 300  },
    { name: 'ODDYSSEY', imageUrl: '../../../../assets/fondo1.jpg', precio: 400  },
    { name: 'RIDGELINE', imageUrl: '../../../../assets/fondo1.jpg', precio: 200  },
    { name: 'FIT', imageUrl: '../../../../assets/fondo1.jpg', precio: 2100  },
    { name: 'CIVIC', imageUrl: '../../../../assets/fondo1.jpg', precio: 1200  },
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

  mostrarModal: boolean = false;
  mostrarCarrito: boolean = false;
  productoSeleccionado: Productos | undefined;

  cantidadProductos: number = 1;
  cantidadProductosEnCarrito: number = 0;

  productosAgregados: any[] = [];
  carrito: any[] = [];
  
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

  mostrarDetalles(producto: Productos) {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  incrementarCantidad() {
    this.cantidadProductos++;
  }
  
  decrementarCantidad() {
    if (this.cantidadProductos > 1) {
      this.cantidadProductos--;
    }
  }

  calcularPrecio(): number {
    return this.productoSeleccionado?.precio * this.cantidadProductos;
  }

  agregarAlCarrito1(): void {
    // Obtener el carrito del localStorage
    const carritoString: string | null = localStorage.getItem('carrito');
  
    // Verificar si el valor es nulo
    if (carritoString !== null) {
      // Si no es nulo, convertirlo a un array
      let carrito: any[] = JSON.parse(carritoString);
  
      // Agregar el producto al carrito
      carrito.push({
        producto: this.productoSeleccionado,
        cantidad: this.cantidadProductos
      });
  
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Lógica adicional, como mostrar un mensaje de éxito
      //alert('Producto agregado al carrito');
      
      this.cantidadProductosEnCarrito += this.cantidadProductos;
    } else {
      // Si es nulo, inicializar un nuevo carrito y agregar el producto
      const carrito: any[] = [{
        producto: this.productoSeleccionado,
        cantidad: this.cantidadProductos
      }];
  
      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Lógica adicional, como mostrar un mensaje de éxito
      alert('Producto agregado al carrito');
    }
    this.mostrarModal = false;
  }


  agregarAlCarrito2(): void {
    // Obtener el carrito del localStorage
    const carritoString: string | null = localStorage.getItem('carrito');
  
    // Verificar si el valor es nulo
    if (carritoString !== null) {
      // Si no es nulo, convertirlo a un array
      let carrito: any[] = JSON.parse(carritoString);
  
      // Agregar el producto al carrito
      carrito.push({
        producto: this.productoSeleccionado,
        cantidad: this.cantidadProductos
      });
  
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Almacenar los productos agregados en la variable
      this.productosAgregados = carrito;
  
      // Lógica adicional, como mostrar un mensaje de éxito
      //alert('Producto agregado al carrito');
      
      this.cantidadProductosEnCarrito += this.cantidadProductos;
    } else {
      // Si es nulo, inicializar un nuevo carrito y agregar el producto
      const carrito: any[] = [{
        producto: this.productoSeleccionado,
        cantidad: this.cantidadProductos
      }];
  
      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Almacenar los productos agregados en la variable
      this.productosAgregados = carrito;
  
      // Lógica adicional, como mostrar un mensaje de éxito
      alert('Producto agregado al carrito');
    }
    this.mostrarModal = false;
    this.imprimirProductosCarrito()
  }

 


  agregarAlCarrito(): void {
    // Obtener el producto seleccionado
    const producto = this.productoSeleccionado;
    // Calcular el precio total
    const precioTotal = this.calcularPrecio();
    
    // Agregar el producto al carrito
    this.carrito.push({
      producto: producto,
      cantidad: this.cantidadProductos,
      precioTotal: precioTotal
    });
    this.mostrarModal = false;
    //console.log(this.carrito)
    // Incrementar el contador de productos en el carrito
    this.cantidadProductosEnCarrito++;
   //console.log(this.cantidadProductosEnCarrito)
    // Guardar el carrito en localStorage
   
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    //this.abrirCarrito()
  }

  imprimirProductosCarrito(): void {
    // Obtener los datos del carrito del localStorage
    const carritoString: string | null = localStorage.getItem('carrito');
  
    // Verificar si hay datos en el carrito
    if (carritoString !== null) {
      // Convertir los datos del carrito a un array
      const carrito: any[] = JSON.parse(carritoString);
  
      // Imprimir los datos en la consola
    
      console.log(this.productosAgregados);
      console.log('Productos gregados:');
      console.log(carrito);
      this.mostrarCarrito = true;
    } else {
      console.log('El carrito está vacío');
    }
  }


  
  
  abrirCarrito(): void {
    this.mostrarCarrito = true;
  }
}
