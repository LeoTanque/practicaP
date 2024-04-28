import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pagination } from 'src/app/services/pagination';
import { Productos } from 'src/app/services/productos';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {


 
  clientes: any[] = [];
  errorMessage: string = '';
  client: boolean= false;
 
 filtroGlobal: string = '';
  cardNameValue: any;

  lastTouchTime: number = 0;
  touchTimeout: any;
  cardCodeValue: any;
  ListNumValue:any;
  priceList:any;
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

  //productosOriginales: Productos[] = [];
  productosOriginales: Productos[] = [];
  articulosOriginales:any[]=[];
  //productosPaginados: Productos[] = [];
  productosPaginados: any[] = [];
  totalRegistros: number;
  paginaActual: number = 1;
  productosPorPagina: number = 9;
  filtroTexto: string = '';


  currentPage: number = 0;
  itemsPerPage: number = 9;
  totalPages!: number ;

  mostrarModal: boolean = false;
  mostrarCarrito: boolean = false;
  //productoSeleccionado: Productos | undefined;

  productoSeleccionado:any | undefined


  cantidadProductos: number = 1;
  cantidadProductosEnCarrito: number = 0;

  productosAgregados: any[] = [];
  carrito: any[] = [];
  
  articulos: any[]=[];

  
  constructor(private servicioService: ServicioService) {
    this.totalRegistros = this.productos.length;
    this.totalRegistros = this.articulos.length;
    //this.cargarProductos({ first: 0, rows: 9 });
    
    this.productosOriginales = [...this.productos];
   // this.articulosOriginales = [...this.articulos];
    this.cargarProductos({ first: 0, rows: this.productosPorPagina });
    //this.cargarProductosD({ first: 0, rows: this.productosPorPagina });
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

  this.obtenerDatosArticulos(this.ListNumValue);
    }


    hideDialog() {
      this.client = false
    }




    obtenerDatosArticulos(priceList: number): void {
      this.servicioService.obtenerArticulos(priceList).subscribe(
        response => {
          this.articulos = response.Data;
          console.log('Datos de los artículos:');
          console.log(this.articulos); // Imprimir los datos de los artículos en la consola
    
          // Convertir ListNum a número
          const listNumCliente = parseInt(this.ListNumValue);
    
          // Obtener el valor de PriceList de cada artículo y compararlo con ListNum del cliente seleccionado
          this.articulos.forEach(articulo => {
            const priceListArticulo = parseInt(articulo.PriceList);
            console.log('PriceList del artículo:', priceListArticulo);
            if (priceListArticulo === listNumCliente) {
              console.log('Los valores coinciden. Datos del artículo:');
              console.log(articulo);
            } else {
              console.log('Los valores no coinciden para este artículo:', articulo);
            }
          });
        },
        error => {
          console.error('Error al obtener los datos de los artículos:', error);
        }
      );
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

  cargarProductosD(event: LazyLoadEvent) {
    const startIndex = event.first || 0;
    const endIndex = startIndex + this.productosPorPagina;
    
    let productosFiltrados = this.articulosOriginales.filter(articulo =>
      Object.values(articulo).some((propiedad:any) =>
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

  
  filtrarProductosD() {
    if (this.filtroTexto.trim() === '') {
      // Si el filtro está vacío, restaura los productos originales y carga la primera página
      this.articulos = [...this.articulosOriginales];
      this.cargarProductosD({ first: 0, rows: this.productosPorPagina });
    } else {
      // Si hay texto en el filtro, aplica el filtro a todos los productos y carga la primera página
      this.articulos = this.articulosOriginales.filter(articulo =>
        Object.values(articulo).some((propiedad:any )=>
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



  mostrarDetallesD(articulo: any) {
    this.productoSeleccionado = articulo;
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


  calcularPrecioD(): number {
    return this.productoSeleccionado?.Price * this.cantidadProductos;
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


  agregarAlCarritoD(): void {
    // Obtener el producto seleccionado
    const articulo = this.productoSeleccionado;
    // Calcular el precio total
    const precioTotal = this.calcularPrecioD();
    
    // Agregar el producto al carrito
    this.carrito.push({
      articulo: articulo,
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
