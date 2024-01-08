import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { Observable, catchError, map } from 'rxjs';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

@ViewChild('dt') dt!: Table;

@ViewChild('dt') mc01Table!: Table;   

@ViewChild('tuTabView') tabView: any;
 globalFilterMC01: string = ''; 
 
 ingredient: any = 'SC';
 TipoExistencia:any = null;
 TipoExistencia1:boolean = true;
 
 checked: boolean = true;
 cities!: any[];
 searchText: string = '';


 
 submitted: boolean = false;

 productDialog: boolean = false;
 terceros:boolean=false;
 recomendaciones:boolean = false;
 refacciones: boolean = false;
 cotizaciones:boolean= false
 manoDeObra:boolean = false;
 manoDeObraTecnicos: boolean = false
 product!: any;
 productos!: any[];
 selectedCity: any;
 data: any[] = [];
 products!: any[];
 tiposTrabajo: any[] = [];
 listaSeries:any[]=[];
 listaSeries1:any[]=[];
 listaCordinadores: any[]=[];
 listaTecnicos:any[]=[];
 listaTrabajos:any[]=[];
 listaFallos:any[]=[];
 miFormulario!: FormGroup;

 filtroGlobal: string = '';

dropdownWidth: string = '20rem';
dropdownWidth1: string = '15rem';
dropdownWidth2:string = '5rem'
dropdownWidth3: string='8rem'
dropdownWidth4: string='10rem'
selectedSeries: any;

tipoSeleccionado: string | undefined;

detallesCotizacionAsociados: any[]=[] ;
opcionSeleccionada: any | null = null;

cotizacionSeleccionada: any;
detallesCotizacionSeleccionada: any[]=[];

isBT01Selected: boolean = false;
isMC01Selected: boolean = false;

visibleBT01Modal: boolean = false;
visibleMC01Modal: boolean = false;

selectedTipo!: string;
bt01Data: any[] = [];
mc01Data: any[] = [];
bt01DataArray: any[] = [];
mc01DataArray: any[] = [];
dAdicionales:any={};
SerieAlmacen:any[]=[]
dRefacciones:any[]= [];
dCotizaciones:any[]=[];
dDetallesCotizaciones:any[]=[];
selectedRowData: any;

selectedProduct: any;

clienteProp: string = '';
nombreProp: string = '';
direccionProp: string = '';
ciudad:string ='';
ciudadProp:string = '';
otroInput: string = '';

valorActual: any;

elementosTabla: any[]=[
  {tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:''},
]

elementosTablaRefacciones:any[]=[
  {NoParte:'', Descripcion:'', Cantidad:'', CC:'', SC:'',U_GoodsSerial:'', Almacen:'', Existencia:'',original: true }
]

selectedU_NReparto: any = '';

select:any='';

prioridades: any[] = [
  { label: 'Alta', value: 'A' },
  { label: 'Normal', value: 'N' },
  { label: '-', value: '-' },
];

estados:any[]=[
  {label:'Cotización', value: 'C'},
  {label:'Diagnóstico', value:'D'},
  
  {label:'Terminar', value:'T'}
]

original!: boolean;

indiceActivo: number = 0;
tabIndex!: number;
diagnosticoHabilitado: boolean = true;
refaccionesHabilitado: boolean = true;
manoDeObraHabilitado: boolean = true;
tercerosHabilitado: boolean = true;
recomendacionesHbilitado:boolean= true;
anexosHabilitado:boolean= true
panelActivo: string = 'diagnosticoPanel';

almacenSeleccionado: any | undefined;
opcionesCotizaciones: string[] = [];
compararAlmacen:any

cardcode: string = '';

cotizacionSeleccionadaDocEntry: number | undefined;


//Mano de obra 
dManoDeObra:any[]=[];
elementosTablaManoDeObra:any[]=[
  {Articulos:'', Nombres:'', Horas: '', Cantidad:'', Tecnico:'', Nombre:'',Fecha:'', HReales:'', Ejecutada:'' }
]

ultimaPosicionCreada: number = -1;

dTerceros:any[]=[];
dProveedores:any[]=[];
dOrdenCompra:any[]=[];
ordenesCompraAsociadas:any[]=[]
ordenCompra: boolean= false
elementosTablaTerceros:any[]=[
    {Proveedor:'', Nombre:'', OrdenCompra: '', Total:''}
]

dRecomendaciones:any[]=[];
elementosTablaRecomendaciones:any[]=[
  {NoParte:'', Descripcion:'', Cantidad: ''}
]
constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosBT01();
    this.cargarDatosMC01();
    this.cargarDatosRefacciones();
    this.selectedSeries = null;
   
    this.cargarDatosManoDeObra();
    this.cargarDatosProveedoresTerceros()
   // this.cargarDatosOrdenTerceros()
    this.cargarDatosRecomendaciones()


    this.miFormulario = this.fb.group({
      tipoTrabajo: [''], 
      selectedSeries: [''],
      otroInput: [''],
      selectedSeriesInput: [''],
      fueraDeServicio: [''],
      prioridadSeleccionada:[''],
      estadoSeleccionado:[''],
      seleccionTecnico: [''],
      seleccionCoordinador: [''],
      seleccionarFormato: [''],
      dropdownCotizaciones: [null],
    });

    this.valorActual = this.miFormulario.value.tipoTrabajo;
    this.actualizarIndiceActivo();
    //this.onEstadoSeleccionadoChange1({ value: 'D' });
  }

  
  cargarDatos() {
    this.creacionOrdenesService.listarCombos().subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.data = response.data;
          console.log(response.data);
          this.tiposTrabajo = response.data.listaTipos;
          this.listaSeries = response.data.listaSeries;
          console.log('Lista de Series:', this.listaSeries);
          this.listaCordinadores = response.data.listaCordinadores;
          //console.log(response.data.listaCordinadores);
          this.listaTecnicos = response.data.listaTecnicos;

          console.log('Esta es la lista de los tecnicos', this.listaTecnicos)
          this.listaTrabajos = response.data.listaTrabajos;
          this.listaFallos = response.data.listaFallos;
        
        } else {
          console.error('Error al obtener datos del API');
        }
      },
      (error) => {
        console.error('Error de conexión al API');
      }
    );
  }


  cargarDatosBT01() {
    this.creacionOrdenesService.listarBT01().subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.bt01Data = response.data;
          console.log(response.data)
        } else {
          console.error('Error al obtener datos BT01 del API');
        }
      },
      (error) => {
        console.error('Error de conexión al API');
      }
    );
  }

  cargarDatosMC01() {
    this.creacionOrdenesService.listarMC01().subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.mc01Data = response.data;
          console.log(response.data);
          // Puedes asignar los datos a otras propiedades o realizar otras acciones aquí
        } else {
          console.error('Error al obtener datos MC01 del API');
        }
      },
      (error) => {
        console.error('Error de conexión al API');
      }
    );
  }

  

  cargarDatosAdicionalesMC01(tipo:any, codigo:any){
  this.creacionOrdenesService.datosMC01(codigo,tipo).subscribe(
    (response)=> {
      if(response.ResultCode === 0 && response.data){
        
        this.dAdicionales = response.data[0];
        console.log('Datos dicionales de MC01',this.dAdicionales);
      }else{
        console.error('Error al obtener datos MC01 del API');
      }
    },
    (error) => {
      console.error('Error de conexión al API');
    }
  );
}




cargarDatosSeriealmacen(serie: any) {
  this.creacionOrdenesService.seriesAlmacen(serie).subscribe(
    (response) => {
      if (response.ResultCode === 0 && response.data) {
        this.SerieAlmacen = response.data;
        console.log('Datos de almacen por serie', this.SerieAlmacen );
        console.log('Comparar', this.SerieAlmacen[0].WhsName)
        this.almacenSeleccionado = response.data.map((almacen: { WhsName: any; WhsCode: any; }) => ({ label: almacen.WhsName, value: almacen.WhsCode }));
        console.log('Datos de almacen Seleccionado', this.almacenSeleccionado);
        
      } else {
        console.error('Error al obtener datos MC01 del API');
      }
    },
    (error) => {
      console.error('Error de conexión al API');
    }
  );
}


  

  cargarDatosCotizaciones1(codigo: any) {
    // Obtén el CardName del input dAdicionales
    const cardNameInput = this.dAdicionales?.CardName || '';
    console.log('Este es el dato del input', cardNameInput);
  
    // Verifica si el CardName coincide con el valor del CardName en las cotizaciones
    this.creacionOrdenesService.traerCotizaciones(codigo).subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.dCotizaciones = response.data;
  
          // Verifica si hay alguna cotización que coincide con el CardName
          const cotizacionCoincide = this.dCotizaciones.some(cotizacion => cotizacion.CardName === cardNameInput);
  
          if (cotizacionCoincide) {
            console.log('Comparacion', cotizacionCoincide);
            console.log('Datos de las cotizaciones', this.dCotizaciones);
            this.cotizaciones = true;

            this.cotizacionSeleccionada = response.data.find((cotizacion:any) => cotizacion.CardName === cardNameInput);



          } else {
            // Si no hay coincidencias, muestra un mensaje de error
            Swal.fire({
              title: 'Error',
              text: 'El CardName no coincide con las cotizaciones.',
              icon: 'error'
            });
            console.error('Error: No hay coincidencias entre CardName y las cotizaciones.');
            // Aquí puedes mostrar un SweetAlert con el mensaje de error
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No existe ningun cotización asociada.',
            icon: 'error'
          });
          console.error('Error al obtener datos de cotizaciones del API');
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error de conexión al API.',
          icon: 'error'
        });
        console.error('Error de conexión al API');
        // Aquí también puedes mostrar un SweetAlert con el mensaje de error de conexión
      }
    );

    
  }
  
/*
  cargarDatosCotizaciones(codigo: any) {
    // Obtén el CardName del input dAdicionales
    const cardNameInput = this.dAdicionales?.CardName || '';
    console.log('Este es el datos del input', cardNameInput);
  
    // Verifica si el CardName coincide con el valor del CardName en las cotizaciones
    this.creacionOrdenesService.traerCotizaciones(codigo).subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.dCotizaciones = response.data;
  
          // Verifica si hay alguna cotización que coincide con el CardName
          this.cotizacionSeleccionada = this.dCotizaciones.find(cotizacion => cotizacion.CardName === cardNameInput);
  
          if (this.cotizacionSeleccionada) {
            //console.log('Comparacion', this.cotizacionSeleccionada);
            console.log('Datos de las cotizaciones', this.dCotizaciones);
  
            
  
            // Verifica si la opción ya existe en el arreglo
            const opcion = `${this.cotizacionSeleccionada.SeriesName} - ${this.cotizacionSeleccionada.DocNum}`;
            if (!this.opcionesCotizaciones.includes(opcion)) {
              // Agrega la nueva opción al arreglo
              this.opcionesCotizaciones.push(opcion);
  
              // Asigna el nuevo arreglo de opciones al p-dropdown
              this.miFormulario.get('dropdownCotizaciones')?.setValue(this.opcionesCotizaciones);
  
              // Muestra un mensaje de éxito
              Swal.fire({
                title: 'Éxito',
                text: 'La fila seleccionada coincide con la serie seleccionada.',
                icon: 'success'
              });
            } 
  
            // Muestra el modal de cotizaciones
            this.cotizaciones = true;
          } else {
            // Si no hay coincidencias, muestra un mensaje de error
            Swal.fire({
              title: 'Error',
              text: 'El CardName no coincide con las cotizaciones.',
              icon: 'error'
            });
            console.error('Error: No hay coincidencias entre CardName y las cotizaciones.');
            // Aquí puedes mostrar un SweetAlert con el mensaje de error
          }
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No existe ninguna cotización asociada.',
            icon: 'error'
          });
          console.error('Error al obtener datos de cotizaciones del API');
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error de conexión al API.',
          icon: 'error'
        });
        console.error('Error de conexión al API');
        // Aquí también puedes mostrar un SweetAlert con el mensaje de error de conexión
      }
    );
  }*/


/*
cargarDatosDetallesCotizaciones(docentry:any){
this.creacionOrdenesService.traerDescripcionCotizaciones(docentry).subscribe(
  (response)=>{
    if(response.ResultCode === 0 && response.data){
      this.dDetallesCotizaciones = response.data;
      console.log('Datos detalles de cotizaciones', this.dDetallesCotizaciones)
    }else {
      console.error('Error al obtener datos de cotizaciones del API');
    }
  },
  (error) => {
    console.error('Error de conexión al API');
  
  }
)
}*/


cargarDatosDetallesCotizaciones(docentry: any): Observable<any[]> {
  return this.creacionOrdenesService.traerDescripcionCotizaciones(docentry).pipe(
    map(response => {
      if (response.ResultCode === 0 && response.data) {
      this.dDetallesCotizaciones= response.data
      console.log('Datos detalles de cotizaciones', this.dDetallesCotizaciones);
     
      return response.data;
    
       
      } else {
        console.error('Error al obtener datos de cotizaciones del API');
        return [];
      }
    }),
    catchError(error => {
      console.error('Error de conexión al API', error);
      return [];
    })
  );
}


cargarDatosRefacciones(){
  
  this.creacionOrdenesService.datosRefacciones().subscribe(
    (response)=>{
      if(response.ResultCode=== 0 && response.data){
     
        this.dRefacciones = response.data
        console.log('Despues de la suscripcion',this.dRefacciones);
        const whsNames = this.dRefacciones.map((item) => item.WhsName);
        console.log('Valores de WhsName:', whsNames);
      }else{
        console.error('Error al obtener datos del API')
      }
    }
  )
}




cargarDatosManoDeObra(){
  this.creacionOrdenesService.traerManoDeObra().subscribe(
    (response)=>{
      if(response.ResultCode ===0 && response.data){
        this.dManoDeObra = response.data
        console.log('Datos Mano de Obra',this.dManoDeObra);
      }else {
        console.error('Error al obtener datos del API')
      }
    }
  )
}


cargarDatosProveedoresTerceros(){
  this.creacionOrdenesService.traerProveedoresTerceros().subscribe(
    (response)=>{
      if(response.ResultCode === 0 && response.data){
        this.dProveedores = response.data
        console.log('Estos son los proveedores', this.dProveedores);
      }else{
        console.error('Error al obtener datos del API')
      }
    }
  )
}

/*
cargarDatosOrdenTerceros(){
  this.creacionOrdenesService.traerOedenCompraTerceros1().subscribe(
    (response)=>{
     if(response.ResultCode ===0 && response.data){
      this.dOrdenCompra = response.data
      console.log('Estosjsj', this.dOrdenCompra)
     }else {
      console.error('Error al obtener datos MC01 del API');
    }
  },
  (error) => {
    console.error('Error de conexión al API');
    }
  )
}*/


cargarDatosRecomendaciones(){
  this.creacionOrdenesService.traerRecomendaciones().subscribe(
    (response)=>{
      if(response.ResultCode ===0 && response.data){
        this.dRecomendaciones = response.data
        console.log('Datos Recomendaciones',this.dRecomendaciones);
      }else {
        console.error('Error al obtener datos del API')
      }
    }
  )
}

/*
cargarDatosOrdenTerceros1(codigo:any):Observable<any[]>{
  return this.creacionOrdenesService.traerOedenCompraTerceros(codigo).pipe(
    map(response => {
      if (response.ResultCode === 0 && response.data) {
      this.dOrdenCompra= response.data
      console.log('Datos detalles de cotizaciones', this.dOrdenCompra);
     
      return response.data;
    
       
      } else {
        console.error('Error al obtener datos  del API');
        return [];
      }
    }),
    catchError(error => {
      console.error('Error de conexión al API', error);
      return [];
    })
  );
}*/


/*
cargarDatosOrdenTerceros21(proveedor: any) {
  this.creacionOrdenesService.traerOedenCompraTerceros(proveedor.codigo).subscribe(
    (response) => {
      if (response.ResultCode === 0 && response.data) {
        this.dOrdenCompra = response.data;
        console.log('Ordenes de compra asociadas:', this.dOrdenCompra);
      } else {
        console.error('Error al obtener datos del API para el proveedor: ', proveedor.CardCode);
      }
    },
    (error) => {
      console.error('Error de conexión al API');
    }
  );
}*/


onFilterChange() {
  // Puedes agregar lógica adicional aquí si es necesario
  // Filtra la tabla cuando el valor de filtroGlobal cambia
  //dt3.filterGlobal(this.filtroGlobal, 'contains');
}




  onDropdownChange1(event: any) {
  
    console.log('Dropdown changed:', event.value);
    const serieSeleccionada = this.miFormulario.value.selectedSeries;
    console.log('Esta es la serie eleccionada', serieSeleccionada);
    let selectedObject = event.value;
    console.log(event.value);
    // Verifica si es una cadena (como 'CULIACAN')
    if (typeof event.value === 'string') {
      // Puedes buscar el objeto correspondiente en tu lista de series
      selectedObject = this.listaSeries.find(series => series.Code === event.value);
      console.log('Opcion', selectedObject);
    }
  
    if (selectedObject) {
      const nextNum = selectedObject.U_NextNum;
  
      console.log('U_NextNum:', nextNum);
  
      if (nextNum !== undefined) {
        // Asigna el valor de U_NextNum al FormControl correspondiente
        this.miFormulario.get('selectedSeriesInput')?.setValue(nextNum);
      }
  
      // Actualiza el valor de almacenSeleccionado
      this.cargarDatosSeriealmacen(selectedObject.Code);
      this.almacenSeleccionado = selectedObject.Code; // Asegúrate de que la propiedad almacen exista en tu objeto
      this.checked= true
      
      console.log('Datos de almacen Seleccionado antes', this.almacenSeleccionado);

    }
  }
  
 
  

  onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);
  
    // Verifica si se ha seleccionado previamente un tipo de trabajo
    if (this.miFormulario.get('tipoTrabajo')?.value ) {
      if(this.miFormulario.get('selectedSeries')?.value){
// Establece las variables en función de la opción seleccionada
this.isBT01Selected = event.value === 'BT01';
this.isMC01Selected = event.value === 'MC01';

// Evalúa la opción seleccionada en el segundo p-dropdown
if (this.isBT01Selected) {
  this.visibleBT01Modal = true;
} else if (this.isMC01Selected) {
  this.visibleMC01Modal = true;
} else {
  // Muestra una alerta o realiza alguna acción si la opción no coincide
  console.error('Error: La opción seleccionada en el segundo p-dropdown no coincide.');
  // Aquí puedes mostrar un mensaje de error o realizar alguna otra acción.
}
   }else{
        Swal.fire({
          title: 'Error',
          text: 'Debes seleccionar una serie antes de seleccionar el tipo.',
          icon: 'error'
        });
      }
      
    } else {
      // Muestra una alerta o realiza alguna acción si no se ha seleccionado un tipo de trabajo
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.',
        icon: 'error'
      });
      console.error('Error: Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.');
      // Aquí puedes mostrar un mensaje de error o realizar alguna otra acción.
    }
  }
  
  
  onRowDoubleClick(event: any, rowData: any, tipo: string, codigo:any) {
    this.cargarDatosAdicionalesMC01(tipo, codigo)
    console.log(tipo,codigo)
  let seleccion= this.miFormulario.value.tipoTrabajo
   if(this.elementosTabla.length>0 && this.elementosTabla[0].tipo !== null ){
      if(seleccion=== 'MP1200' || seleccion==='MP1000'|| seleccion==='MP200'|| seleccion==='MP2000'|| 
      seleccion==='MP2400'|| seleccion==='MP250'|| seleccion==='MP500'|| seleccion==='MP600'){
        this.elementosTabla[this.elementosTabla.length-1]={tipo:1, U_NReparto: rowData.U_NReparto, U_NumEcon:rowData.U_NumEcon,
           U_GoodsBrand:rowData.U_GoodsBrand,
          U_GoodsModel:rowData.U_GoodsModel, U_GoodsSerial:rowData.U_GoodsSerial, U_OdoAct:rowData.U_OdoAct}
          this.visibleBT01Modal= false;
         this.visibleMC01Modal=false;
         
        this.elementosTabla.push({tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:''})
     
        this.selectedRowData = rowData;
        
        this.clienteProp = rowData.U_CliProp;
        this.nombreProp = rowData.U_NCliProp;
        //this.direccionProp = rowData.dAdicionales.Street;
        console.log(this.direccionProp)
        this.ciudad = rowData.City
        
        
        this.selectedU_NReparto = rowData.U_NReparto;
       
      }else{
        Swal.fire({
          title: "Error",
          text: "No se puede agregar mas equipos",
          icon: "error"
        });
this.visibleBT01Modal=false;
this.visibleMC01Modal=false
      }
   }
   else if(this.elementosTabla.length===1 && this.elementosTabla[0].tipo === null ){
    this.elementosTabla[0]={tipo:1, U_NReparto: rowData.U_NReparto, U_NumEcon:rowData.U_NumEcon, U_GoodsBrand:rowData.U_GoodsBrand,
       U_GoodsModel:rowData.U_GoodsModel, U_GoodsSerial:rowData.U_GoodsSerial, U_OdoAct:rowData.U_OdoAct}
       this.visibleBT01Modal= false;
       this.visibleMC01Modal=false;

       this.elementosTabla.push({tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:''})

      

       this.selectedRowData = rowData;

       this.clienteProp = rowData.U_CliProp;
      
       this.nombreProp = rowData.U_NCliProp;
       //this.direccionProp = rowData.dAdicionales.Street;
      
       this.selectedU_NReparto = rowData.U_NReparto;
   }
  }



onrowDobleClickref(orden: any) {
  // Verifica si la opción "Cotización" está seleccionada en el dropdown de estados
  if (this.miFormulario.get('estadoSeleccionado')?.value === 'C') {
    // Resto de tu lógica...
    console.log('Datos de la fila seleccionada:', orden);

    // Verifica si SerieAlmacen tiene al menos un elemento
    if (this.SerieAlmacen.length > 0) {
      if (this.selectedU_NReparto) {
        // Verifica si la serie de la fila seleccionada coincide con alguna entrada en SerieAlmacen
        const coincideConAlgunAlmacen = this.SerieAlmacen.some(almacen => 
          orden.WhsName === almacen.WhsName || orden.WhsCode === almacen.WhsCode
        );

        if (coincideConAlgunAlmacen) {
          // Crea una nueva fila con los datos de la orden seleccionada
          const nuevaFila = {
            NoParte: '',
            Descripcion: orden.ItemName,
            Cantidad: '',
            CC: '',
            SC: '',
            U_GoodsSerial: '',
            Almacen: orden.WhsName,
            Existencia: '',
            original: true,
          };

          // Agrega la nueva fila a elementosTablaRefacciones
          this.elementosTablaRefacciones.push(nuevaFila);

          // Muestra un mensaje de éxito
          Swal.fire({
            title: 'Éxito',
            text: 'La fila seleccionada coincide con uno de los almacenes por serie seleccionado.',
            icon: 'success'
          });
        } else {
          // Muestra un mensaje de error si la serie no coincide con ningún almacen
          Swal.fire({
            title: 'Error',
            text: 'La fila seleccionada no coincide con ninguno de los almacenes por serie seleccionado.',
            icon: 'error'
          });
        }
      } else {
        // Muestra un mensaje de error si el select de Reparto está vacío
        Swal.fire({
          title: 'Error',
          text: 'El select de Reparto está vacío.',
          icon: 'error'
        });
        console.error('Error: N.Reparto está vacío');
      }
    } else {
      // Muestra un mensaje de error si SerieAlmacen está vacío
      Swal.fire({
        title: 'Error',
        text: 'El select de Serie Almacen está vacío.',
        icon: 'error'
      });
      console.error('Error: SerieAlmacen está vacío');
    }
  } else {
    // Si la opción "Cotización" no está seleccionada, muestra un mensaje de error
    Swal.fire({
      title: 'Error',
      text: 'La opción "Cotización" no está seleccionada.',
      icon: 'error'
    });
    console.error('Error: La opción "Cotización" no está seleccionada en el select de estados.');
  }

  this.refacciones = false;
}


/*
onrowDobleClickref(orden: any) {
  // Verifica si la opción "Cotización" está seleccionada en el dropdown de estados
  if (this.miFormulario.get('estadoSeleccionado')?.value === 'C') {
    // Resto de tu lógica...
    console.log('Datos de la fila seleccionada:', orden);

    // Verifica si SerieAlmacen tiene al menos un elemento
    if (this.SerieAlmacen.length > 0) {
      // Verifica si la serie de la fila seleccionada coincide con la serie seleccionada en SerieAlmacen
      if (this.selectedU_NReparto && (orden.WhsName === this.selectedU_NReparto || orden.WhsCode === this.selectedU_NReparto)) {
        // Crea una nueva fila con los datos de la orden seleccionada
        const nuevaFila = {
          NoParte: '',
          Descripcion: orden.ItemName,
          Cantidad: '',
          CC: '',
          SC: '',
          U_GoodsSerial: '',
          Almacen: orden.WhsName,
          Existencia: '',
          original: true,
        };

        // Agrega la nueva fila a elementosTablaRefacciones
        this.elementosTablaRefacciones.push(nuevaFila);

        // Muestra un mensaje de éxito
        Swal.fire({
          title: 'Éxito',
          text: 'La fila seleccionada coincide con la serie por reparto seleccionada.',
          icon: 'success'
        });
      } else {
        // Muestra un mensaje de error si la serie no coincide con la seleccionada
        Swal.fire({
          title: 'Error',
          text: 'La fila seleccionada no coincide con la serie por reparto seleccionada.',
          icon: 'error'
        });
      }
    } else {
      // Muestra un mensaje de error si SerieAlmacen está vacío
      Swal.fire({
        title: 'Error',
        text: 'El select de Serie Almacen está vacío.',
        icon: 'error'
      });
      console.error('Error: SerieAlmacen está vacío');
    }
  } else {
    // Si la opción "Cotización" no está seleccionada, muestra un mensaje de error
    Swal.fire({
      title: 'Error',
      text: 'La opción "Cotización" no está seleccionada.',
      icon: 'error'
    });
    console.error('Error: La opción "Cotización" no está seleccionada en el select de estados.');
  }

  this.refacciones = false;
}*/


onAlmacenSeleccionadoChange(event: any) {
  console.log('Opción seleccionada:', event.value);
  // Puedes hacer más cosas aquí según tus necesidades
}


onrowDobleClickcotizacion1(cotizacion: any) {
  if (this.miFormulario.get('estadoSeleccionado')?.value === 'C') {
    console.log('Datos de la fila seleccionada:', cotizacion);

    // Obtén el valor seleccionado del dropdown
    const serieSeleccionada = this.miFormulario.value.selectedSeries;

    // Verifica si es una cadena (como 'CULIACAN')
    let selectedObject = serieSeleccionada;
    if (typeof serieSeleccionada === 'string') {
      // Busca el objeto correspondiente en la lista de series
      selectedObject = this.listaSeries.find(series => series.Code === serieSeleccionada);
    }

    // Verifica si existe un objeto seleccionado
    if (selectedObject) {
      // Verifica la condición deseada
      if (cotizacion.SeriesName === selectedObject.Code) {
        this.cargarDatosDetallesCotizaciones(cotizacion.DocEntry).subscribe(
          detallesCotizacion => {
            // Verifica si la opción ya existe en el arreglo

            const opcion = `${cotizacion.SeriesName} - ${cotizacion.DocNum}`;
            const existeEnArreglo = this.opcionesCotizaciones.some(op => op === opcion);

            if (!existeEnArreglo) {
              // Agrega la nueva opción al arreglo
              this.opcionesCotizaciones.push(opcion);

              // Asigna el nuevo arreglo de opciones al p-dropdown
              this.miFormulario.get('dropdownCotizaciones')?.setValue(this.opcionesCotizaciones);

              // Verifica si los detalles ya están cargados en la tabla
              const detallesYaCargados = this.elementosTablaRefacciones.some(fila => fila.Almacen === cotizacion.DocEntry);

              if (!detallesYaCargados) {
                // Carga los detalles en la tabla solo si no están cargados
                detallesCotizacion.forEach(detalle => {
                  const nuevaFila = {
                    id_padre: opcion,
                    NoParte: detalle.ItemCode,
                    Descripcion: detalle.Dscription,
                    Cantidad: detalle.Quantity,
                    CC: 'CC',
                    SC: '',
                    U_GoodsSerial: '',
                    Almacen: cotizacion.SeriesName,
                    Existencia: '',
                    original: false,
                    cotizacionAsociada: true,
                  };

                  // Agregar la nueva fila a la tabla
                  this.elementosTablaRefacciones.push(nuevaFila);
                  this.elementosTablaRefacciones = [...this.elementosTablaRefacciones];
                });
              } else {
                // Muestra un mensaje de error si los detalles ya están cargados
                Swal.fire({
                  title: 'Error',
                  text: 'Los detalles de la cotización ya están cargados en la tabla.',
                  icon: 'error'
                });
                console.error('Error: Los detalles de la cotización ya están cargados en la tabla.');
              }
            } else {
              // Muestra un mensaje de error si la opción ya existe
              Swal.fire({
                title: 'Error',
                text: 'La cotización ya está cargada.',
                icon: 'error'
              });
              console.error('Error: La cotización ya está cargada.');
            }
          }
        );
      } else {
        // Muestra un mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'La propiedad SeriesName no coincide con el valor de Code.',
          icon: 'error'
        });
        console.error('Error: La propiedad SeriesName no coincide con el valor de Code.');
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado ninguna opción en el dropdown',
        icon: 'error'
      });
      console.error('Error: No se ha seleccionado ninguna opción en el dropdown.');
    }
  } else {
    // Si la opción "Cotización" no está seleccionada, muestra un mensaje de error
    Swal.fire({
      title: 'Error',
      text: 'La opción "Cotización" no está seleccionada.',
      icon: 'error'
    });
    console.error('Error: La opción "Cotización" no está seleccionada en el select de estados.');
  }
  this.cotizaciones = false;
}


onrowDobloClickManoDeObra1(mano: any) {
  // Crea un nuevo objeto para la nueva posición en la tabla
  const nuevaManoDeObra = {
    Articulo: mano.ItemCode,
    Nombres: mano.ItemName,
    Horas: mano.stocktotal,
    Cantidad: '',
    Tecnico: '',   
    Nombre: '',    
    Fecha: '',   
    HReales: '', 
    Ejecutada: '',
  
  };

  this.elementosTablaManoDeObra.push(nuevaManoDeObra);

  this.ultimaPosicionCreada = this.elementosTablaManoDeObra.length - 1;

  this.manoDeObra = false
  this.elementosTablaManoDeObra = [...this.elementosTablaManoDeObra];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}

/*
onrowDobloClickTecnico(manoTecnicos: any) {
  // Busca la posición de nuevaManoDeObra
  const nuevaManoDeObraIndex = this.elementosTablaManoDeObra.findIndex((item) => item.Articulo);

  if (nuevaManoDeObraIndex !== -1) {
    // Actualiza las propiedades "Técnico" y "Nombre" en la misma posición de nuevaManoDeObra
   this.elementosTablaManoDeObra[nuevaManoDeObraIndex].Tecnico = manoTecnicos.Code;
   this.elementosTablaManoDeObra[nuevaManoDeObraIndex].Nombre = manoTecnicos.Name;
    
  } else {
    // Si nuevaManoDeObra no está creada, muestra un mensaje o realiza alguna acción necesaria
    Swal.fire({
      title: 'Error',
      text: 'La posicion nuevaManoDeObra no está creada.',
      icon: 'error'
    });
    console.error("Error: nuevaManoDeObra no está creada");

  }
  this.manoDeObraTecnicos = false;
}*/

onrowDobloClickTecnico(manoTecnicos: any) {
  // Verifica si hay una posición creada
  if (this.ultimaPosicionCreada !== -1) {
    // Actualiza las propiedades "Técnico" y "Nombre" en la última posición de nuevaManoDeObra
    this.elementosTablaManoDeObra[this.ultimaPosicionCreada].Tecnico = manoTecnicos.Code;
    this.elementosTablaManoDeObra[this.ultimaPosicionCreada].Nombre = manoTecnicos.Name;
  } else {  
    // Si nuevaManoDeObra no está creada, muestra un mensaje o realiza alguna acción necesaria
    Swal.fire({
      title: 'Error',
      text: 'La posición nuevaManoDeObra no está creada.',
      icon: 'error'
    });
    console.error("Error: nuevaManoDeObra no está creada");
  }

  this.manoDeObraTecnicos = false;
}

/*
onrowDobloClickProveedoresTerceros(proveedor: any) {
  // Crea un nuevo objeto para la nueva posición en la tabla
  console.log('Datos de la fila seleccionada:', proveedor);

  const nuevaProveedores = {
    Proveedor: proveedor.CardCode,
    Nombre: proveedor.CardName,
    OrdenCompra: '',
    Total:''
    
  };

  this.elementosTablaTerceros.push(nuevaProveedores);
  this.terceros = false
  this.elementosTablaTerceros = [...this.elementosTablaTerceros];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}*/


/*
onrowDobloClickProveedoresTerceros(proveedor: any) {
  // Llamada al servicio para obtener las órdenes de compra asociadas
  this.creacionOrdenesService.traerOedenCompraTerceros(proveedor.CardCode).subscribe(
    (ordenesCompra) => {
      // Asigna las órdenes de compra a la variable correspondiente
      this.ordenesCompraAsociadas = ordenesCompra;

      // Puedes imprimir las órdenes de compra para verificar en consola
      console.log('Órdenes de compra asociadas:', this.ordenesCompraAsociadas);
      console.log(proveedor.CardCode)
    },
    (error) => {
      console.error('Error al cargar órdenes de compra:', error);
    }
  );

  // Resto del código para agregar la fila a la tabla
  const nuevaProveedores = {
    Proveedor: proveedor.CardCode,
    Nombre: proveedor.CardName,
    OrdenCompra: '',
    Total: ''
  };

  this.elementosTablaTerceros.push(nuevaProveedores);
  this.terceros = false;
  this.elementosTablaTerceros = [...this.elementosTablaTerceros];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}*/

// tu-componente.component.ts
/*
onrowDobloClickProveedoresTerceros(proveedor: any) {
  // Imprime el CardCode en la consola para verificar que es correcto
  console.log('CardCode del proveedor:', proveedor.CardCode);

  // Llamada al servicio para obtener las órdenes de compra asociadas
  this.creacionOrdenesService.traerOedenCompraTerceros2(proveedor.CardCode).subscribe(
    (ordenesCompra) => {
      // Asigna las órdenes de compra a la variable correspondiente
      this.ordenesCompraAsociadas = ordenesCompra;

      
      // Puedes imprimir las órdenes de compra para verificar en consola
      console.log('Órdenes de compra asociadas:', this.ordenesCompraAsociadas);
     

    },
    (error) => {
      console.error('Error al cargar órdenes de compra:', error);
    }
  );

  // Resto del código para agregar la fila a la tabla
  const nuevaProveedores = {
    Proveedor: proveedor.CardCode,
    Nombre: proveedor.CardName,
    OrdenCompra: '',
    Total: ''
  };

  this.elementosTablaTerceros.push(nuevaProveedores);
  this.terceros = false;
  this.elementosTablaTerceros = [...this.elementosTablaTerceros];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}*/

onrowDobloClickProveedoresTerceros(proveedor: any) {
  // Imprime el CardCode en la consola para verificar que es correcto
  console.log('CardCode del proveedor:', proveedor.CardCode);

  // Llamada al servicio para obtener las órdenes de compra asociadas
  this.creacionOrdenesService.traerOedenCompraTerceros2(proveedor.CardCode).subscribe(
    (response: any) => {
      // Verifica que la respuesta tenga el código de resultado y data antes de procesarla
      if (response && response.ResultCode === 0 && response.data) {
        // Convierte el objeto 'data' en un array si no es un array ya
        this.ordenesCompraAsociadas = Array.isArray(response.data) ? response.data : [response.data];
      } else {
        // Si no hay datos o el código de resultado no es 0, asigna un array vacío
        this.ordenesCompraAsociadas = [];
        console.error('Error al cargar órdenes de compra:', response.Resultmensaje);
      }

      console.log('Órdenes de compra asociadas:', this.ordenesCompraAsociadas);
    },
    (error) => {
      console.error('Error al cargar órdenes de compra:', error);
    }
  );

  // Resto del código para agregar la fila a la tabla
  const nuevaProveedores = {
    Proveedor: proveedor.CardCode,
    Nombre: proveedor.CardName,
    OrdenCompra: '',
    Total: ''
  };

  this.elementosTablaTerceros.push(nuevaProveedores);
  this.ultimaPosicionCreada = this.elementosTablaTerceros.length - 1;
  this.terceros = false;
  this.elementosTablaTerceros = [...this.elementosTablaTerceros];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}


onrowDobloClickOrdenCompraProveedor(ordenCompra: any) {
  // Verifica si hay una posición creada
  if (this.ultimaPosicionCreada !== -1) {
    // Actualiza las propiedades "Técnico" y "Nombre" en la última posición de nuevaManoDeObra
    this.elementosTablaTerceros[this.ultimaPosicionCreada].OrdenCompra = ordenCompra.CardName;
    this.elementosTablaTerceros[this.ultimaPosicionCreada].Total = ordenCompra.DocTotal;
  } else { 
    // Si nuevaManoDeObra no está creada, muestra un mensaje o realiza alguna acción necesaria
    Swal.fire({
      title: 'Error',
      text: 'La posición nuevaManoDeObra no está creada.',
      icon: 'error'
    });
    console.error("Error: nuevaManoDeObra no está creada");
  }

  this.ordenCompra = false;
}



onrowDobloClickREcomendaciones(recomendacion: any) {
  // Crea un nuevo objeto para la nueva posición en la tabla
  const nuevaRecomendacion = {
    NoParte: recomendacion.ItemCode,
    Descripcion: recomendacion.ItemName,
    Cantidad: '',
    
  };

  this.elementosTablaRecomendaciones.push(nuevaRecomendacion);
  this.recomendaciones = false
  this.elementosTablaRecomendaciones = [...this.elementosTablaRecomendaciones];
  // Limpia el formulario si es necesario
  this.miFormulario.reset();
}


loadDataToInitialTable() {
  // Lógica para cargar datos BT01 y asignarlos a bt01DataArray
  this.bt01DataArray.forEach(row => {
    this.bt01Data.push(row);
  });

  // Lógica para cargar datos MC01 y asignarlos a mc01DataArray
  this.mc01DataArray.forEach(row => {
    this.mc01Data.push(row);
  });

  // Actualizar la tabla principal
  this.dt?.reset();  // Para BT01
  this.mc01Table?.reset();  // Para MC01
}


onEliminarFila(elemento: any) {
  const indice = this.elementosTabla.indexOf(elemento);
  if (indice !== -1) {
    this.elementosTabla.splice(indice, 1);
  }
}

onEliminarFilaterceros(elemento: any) {
  
  if (elemento) {
    const indice = this.elementosTablaTerceros.indexOf(elemento);
    
    if (indice !== -1) {
      this.elementosTablaTerceros.splice(indice, 1);
    }
  } else {
    // Muestra un mensaje de error ya que la fila está asociada a una cotización
    Swal.fire({
      title: 'Error',
      text: 'No se pudo eliminar.',
      icon: 'error'
    });
  }
}

onEliminarFilaRecomendacion(elemento: any) {
  
  if (elemento) {
    const indice = this.elementosTablaRecomendaciones.indexOf(elemento);
    
    if (indice !== -1) {
      this.elementosTablaRecomendaciones.splice(indice, 1);
    }
  } else {
    // Muestra un mensaje de error ya que la fila está asociada a una cotización
    Swal.fire({
      title: 'Error',
      text: 'No se pudo eliminar.',
      icon: 'error'
    });
  }
}

onEliminarFilaMano(elemento: any) {
  
  if (elemento) {
    const indice = this.elementosTablaManoDeObra.indexOf(elemento);
    
    if (indice !== -1) {
      this.elementosTablaManoDeObra.splice(indice, 1);
    }
  } else {
    // Muestra un mensaje de error ya que la fila está asociada a una cotización
    Swal.fire({
      title: 'Error',
      text: 'No se pudo eliminar.',
      icon: 'error'
    });
  }
}

onEliminarFilaRef(elemento: any) {
  // Verifica si la fila a eliminar es una fila original
  if (elemento.original) {
    const indice = this.elementosTablaRefacciones.indexOf(elemento);
    
    if (indice !== -1) {
      this.elementosTablaRefacciones.splice(indice, 1);
    }
  } else {
    // Muestra un mensaje de error ya que la fila está asociada a una cotización
    Swal.fire({
      title: 'Error',
      text: 'Esta fila está asociada a una cotización y no se puede eliminar.',
      icon: 'error'
    });
  }
}




onDropdownChange2(event: any) {
  console.log('Opción seleccionada:', event.value);

  const opcionSeleccionada = this.miFormulario.value.dropdownCotizaciones;

  if (typeof opcionSeleccionada === 'string') {
    const [seriesName, docNum] = opcionSeleccionada.split(' - ');

    const cotizacionSeleccionada = this.dCotizaciones.find((cotizacion: any) =>
      cotizacion.SeriesName === seriesName && cotizacion.DocNum === parseInt(docNum)
    );

    const cotizacionSelect = cotizacionSeleccionada.DocEntry
    console.log('CTS', cotizacionSelect )

    if (cotizacionSeleccionada) {
      this.cotizacionSeleccionadaDocEntry = cotizacionSeleccionada.DocEntry;
      console.log('cotizacion seleccionada docentry', this.cotizacionSeleccionadaDocEntry)
      this.cargarDatosDetallesCotizaciones(cotizacionSeleccionada.DocEntry).subscribe(
        detallesCotizacion => {
          console.log('Detalles de la cotización seleccionada (desde la tabla):', detallesCotizacion);
          
          // Puedes realizar otras acciones con los detalles cargados
        }
      );
    } else {
      console.error('Error: No se encontró la cotización correspondiente en tus datos.');
    }
  }
}

// Método eliminarCotizacionYDetalles
eliminarCotizacionYDetalles2(cotizacion: any) {
  const opcionSeleccionada = this.miFormulario.get('dropdownCotizaciones')?.value;
  console.log('quitar cotizacion')
  console.log(opcionSeleccionada)
  console.log(this.elementosTablaRefacciones)
  if(opcionSeleccionada){
    this.elementosTablaRefacciones = this.elementosTablaRefacciones.filter(opcion => opcion.id_padre !== opcionSeleccionada);
    this.opcionesCotizaciones = this.opcionesCotizaciones.filter(opcion => opcion !== opcionSeleccionada);
    this.miFormulario.get('dropdownCotizaciones')?.setValue(this.opcionesCotizaciones);
  
    console.log('Opción eliminada:', opcionSeleccionada);
    console.log('Nuevas opciones:', this.elementosTablaRefacciones);
  
    const cotizacionSelect = this.cotizacionSeleccionada.DocEntry
    console.log('Valor de la propiedad en el select', cotizacionSelect)

    

  }else{
    Swal.fire({
      title: 'Error',
      text: 'No se ha seleccionado ninguna opción en el dropdown',
      icon: 'error'
    });
    console.error('No hay opción seleccionada en el dropdown.'); 
  }



}




openNew3() {
 
  this.refacciones = true
 }

 cotizacion(){
  this.cotizaciones = true;
 }

 openNewMano(){
  this.manoDeObra = true
 }

 openTerceros(){
  this.terceros = true
 }

 openOrdenCompra(){
  this.ordenCompra = true
 }

recomendacionesModal(){
  this.recomendaciones = true
}

openManoTecnico(){
  this.manoDeObraTecnicos = true
}

  hideBT01Modal() {
    this.visibleBT01Modal = false;
  }
  
  hideMC01Modal() {
    this.visibleMC01Modal = false;
  }

  
  onEstadoSeleccionadoChange(event:any) {
    console.log('Opción seleccionada:', event.value);

    const estadoSeleccionado = this.miFormulario.value.estadoSeleccionado;
    console.log('Este es el estado Seleccionado', estadoSeleccionado)
    // Lógica según tus necesidades


    this.actualizarIndiceActivo();
  }

  private actualizarIndiceActivo() {
    let estadoSeleccionado = this.miFormulario.value.estadoSeleccionado;

    this.diagnosticoHabilitado = estadoSeleccionado === 'D';
    this.refaccionesHabilitado = estadoSeleccionado !== 'D';
    this.manoDeObraHabilitado = estadoSeleccionado !== 'D';
    this.tercerosHabilitado = estadoSeleccionado !== 'D';
    this.recomendacionesHbilitado = estadoSeleccionado !== 'D';
    this.anexosHabilitado = estadoSeleccionado !== 'D';

    if (estadoSeleccionado === 'D' && this.panelActivo !== 'diagnosticoPanel') {
      const panelActual = this.tabView.tabs.find((tab:any) => tab.header === this.panelActivo);
      if (panelActual) {
        panelActual.selected = false; // Oculta el panel actual
      }
      this.panelActivo = 'diagnosticoPanel'; // Establece el panel "Diagnóstico" como activo
    }else {
      this.mostrarContenidoPanelActual();
    }
    
  }

  onTabChange(event: any) {
    this.panelActivo = event.index.header;
  }

  mostrarContenidoPanelActual() {
    if (this.tabView && this.tabView.tabs) {
      const panelActual = this.tabView.tabs.find((tab: any) => tab.header === this.panelActivo);
      if (panelActual) {
        panelActual.selected = true;
        panelActual.content.nativeElement.style.display = 'block';
      }
    }
  }
  
  
  onEstadoSeleccionadoChange1(event: any) {
    console.log('Opción seleccionada:', event.value);
  
    const estadoSeleccionado = this.miFormulario.value.estadoSeleccionado;
    console.log('Este es el estado Seleccionado', estadoSeleccionado);
  
    /*
    // Lógica para actualizar los índices y deshabilitar paneles según la opción seleccionada
    switch (estadoSeleccionado) {
      case 'D':
        this.tabIndex = 0; // Índice del panel "Diagnóstico Real"
        this.diagnosticoHabilitado = true;
        this.refaccionesHabilitado = false;
        this.manoDeObraHabilitado = false;
        this.tercerosHabilitado = false;
        this.recomendacionesHbilitado = false;
        this.anexosHabilitado = false;
        break;
      case 'C':
        this.tabIndex = 1;
      this.diagnosticoHabilitado = true;
        this.refaccionesHabilitado = true;
        this.manoDeObraHabilitado = true;
        this.tercerosHabilitado = true;
        this.recomendacionesHbilitado = true;
        this.anexosHabilitado = true;
       
        break;
      case 'T':
        this.tabIndex = 1;
      this.diagnosticoHabilitado = true;
        this.refaccionesHabilitado = true;
        this.manoDeObraHabilitado = true;
        this.tercerosHabilitado = true;
        this.recomendacionesHbilitado = true;
        this.anexosHabilitado = true;
        // Lógica para otras opciones si es necesario
        break;
      default:
        
    }*/

    //tabIndex=0

if(estadoSeleccionado === 'D'){
  this.tabIndex = 0; // Índice del panel "Diagnóstico Real"
  this.diagnosticoHabilitado = true;
  this.refaccionesHabilitado = false;
  this.manoDeObraHabilitado = false;
  this.tercerosHabilitado = false;
  this.recomendacionesHbilitado = false;
  this.anexosHabilitado = false;
}else{
  this.diagnosticoHabilitado = true;
    this.refaccionesHabilitado = true;
    this.manoDeObraHabilitado = true;
    this.tercerosHabilitado = true;
    this.recomendacionesHbilitado = true;
    this.anexosHabilitado = true;
}
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
  this.recomendaciones = false;
  this.cotizaciones = false;
  this.manoDeObraTecnicos = false
  this.ordenCompra = false
}

mTerceros() {
  //this.productDialog = false;
 // this.submitted = false;
  this.terceros = false
  this.manoDeObra = false
}

onchange(event:any){

  let seleccion= this.miFormulario.value.tipoTrabajo
  console.log(this.miFormulario.value.tipoTrabajo)

  if(this.elementosTabla.length >2 && (seleccion==='BD' || seleccion==='CA' || seleccion==='CP' 
  || seleccion ==='CyP'|| seleccion==='HB'|| seleccion==='Hrria'|| seleccion==='Mbra'|| seleccion ==='MC'||
  seleccion==='Mpd'|| seleccion==='PAP'|| seleccion==='RECP'|| seleccion==='Rp'|| seleccion==='Rta'||
  seleccion==='Tr')){
    Swal.fire({
      title: "Error",
      text: "Esta selección no permite tener mas de un equipo agregado en la tabla",
      icon: "error"
    });
    this.miFormulario.patchValue({
      tipoTrabajo: this.valorActual
    });
  } else {
    // Actualiza el valor actual si la validación se cumple
    this.valorActual = seleccion;
  
  }

  
}

}
