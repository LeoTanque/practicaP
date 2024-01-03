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
 //ingredient!: any;
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
  {label:'Diagnóstico', value:'D'},
  {label:'Cotización', value: 'C'},
  {label:'Terminar', value:'T'}
]

original!: boolean;

indiceActivo: number = 0;

diagnosticoHabilitado: boolean = true;
refaccionesHabilitado: boolean = true;
manoDeObraHabilitado: boolean = true;
tercerosHbilitado: boolean = true;
recomendacionesHbilitado:boolean= true;
anexosHabilitado:boolean= true
panelActivo: string = 'diagnosticoPanel';

almacenSeleccionado: any | undefined;
opcionesCotizaciones: string[] = [];
compararAlmacen:any
//almacenSeleccionado:any[]=[]
cardcode: string = '';

constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosBT01();
    this.cargarDatosMC01();
    this.cargarDatosRefacciones();
    this.selectedSeries = null;
   

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




/*
cargarDatosCotizaciones(codigo:any){
  
  this.creacionOrdenesService.traerCotizaciones(codigo).subscribe(
    (response)=>{
      if(response.ResultCode === 0 && response.data){
        this.dCotizaciones = response.data;
        console.log('Datos de las corizaciones', this.dCotizaciones)

        this.cotizaciones=true
      }else {
        console.error('Error al obtener datos de cotizaciones del API');
      }
    },
    (error) => {
      console.error('Error de conexión al API');
    
    }
    )
  }*/


  

  cargarDatosCotizaciones1(codigo: any) {
    // Obtén el CardName del input dAdicionales
    const cardNameInput = this.dAdicionales?.CardName || '';
    console.log('Este es el datos del input', cardNameInput);
  
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


onFilterChange() {
  // Puedes agregar lógica adicional aquí si es necesario
  // Filtra la tabla cuando el valor de filtroGlobal cambia
  //dt3.filterGlobal(this.filtroGlobal, 'contains');
}

  
  
/*
  onDropdownChange(event: any) {
    //this.cargarDatosSeriealmacen(serie);
    console.log('Dropdown changed:', event.value);
    const serieSeleccionada = this.miFormulario.value.selectedSeries;
    console.log('Esta es la serie eleccionada',serieSeleccionada)
    let selectedObject = event.value;
    console.log(event.value);
    this.select = serieSeleccionada
    console.log('Esta es la serie',this.select)
    // Verifica si es una cadena (como 'CULIACAN')
    if (typeof event.value === 'string') {
      // Puedes buscar el objeto correspondiente en tu lista de series
      selectedObject = this.listaSeries.find(series => series.U_SerName === event.value);
      console.log('Opcion', selectedObject);
    }
  
    if (selectedObject) {
      const nextNum = selectedObject.U_NextNum;
  
      console.log('U_NextNum:', nextNum);
  
      if (nextNum !== undefined) {
        // Asigna el valor de U_NextNum al FormControl correspondiente
        this.miFormulario.get('selectedSeriesInput')?.setValue(nextNum);
       
      }
      
    }
  }*/


/*
  onSeriesSelectionChange(event: any) {
    let selectedSerie = event.value;
    console.log(selectedSerie)
    if (selectedSerie) {
      // Llama al método para cargar los datos del almacén
      this.cargarDatosSeriealmacen(selectedSerie);
    }
  }*/
  


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
  
 
  /*
 onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);
  
    // Establece las variables en función de la opción seleccionada
    this.isBT01Selected = event.value === 'BT01';
    this.isMC01Selected = event.value === 'MC01';
  
    if (this.isBT01Selected) {
      this.visibleBT01Modal = true;
      
    
    } else if (this.isMC01Selected) {
      this.visibleMC01Modal = true;
     
    }
  }*/
  

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




/*
onrowDobleClickref(orden: any) {
  // Resto de tu lógica...
  console.log('Datos de la fila seleccionada:', orden);

  // Verifica si SerieAlmacen tiene al menos un elemento
  if (this.SerieAlmacen.length > 0) {
    
    // Verifica si la serie de la fila seleccionada coincide con alguna entrada en SerieAlmacen
    const coincideConAlgunAlmacen = this.SerieAlmacen.some(almacen => 
      orden.WhsName === almacen.WhsName || orden.WhsCode === almacen.WhsCode
    );

    if (coincideConAlgunAlmacen) {
      // Desestructura la primera fila de elementosTablaRefacciones
      const primeraFila = this.elementosTablaRefacciones[0];

      // Asigna los valores de la fila seleccionada a la primera fila de elementosTablaRefacciones
      primeraFila.NoParte = '';
      primeraFila.Descripcion = orden.ItemName;
      primeraFila.Cantidad = '';
      primeraFila.CC = '';
      primeraFila.SC = '';
      primeraFila.U_GoodsSerial = '';
      primeraFila.Almacen = orden.WhsName;
      primeraFila.Existencia = '';

      this.refacciones = false;

      // Muestra una alerta de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'La fila seleccionada coincide con uno de los almacenes por serie seleccionado.',
        icon: 'success'
      });
    } else {
      this.refacciones = false;

      // Si la serie no coincide con ningún almacen, muestra un mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'La fila seleccionada no coincide con ninguno de los almacenes por serie seleccionado.',
        icon: 'error'
      });
    }
  } else {
    this.refacciones = false;
    // Maneja el caso en que SerieAlmacen está vacío
    Swal.fire({
      title: 'Error',
      text: 'El select de Serie Almacen está vacío.',
      icon: 'error'
    });
    console.error('Error: SerieAlmacen está vacío');
  }
}*/


onrowDobleClickref(orden: any) {
  // Verifica si la opción "Cotización" está seleccionada en el dropdown de estados
  if (this.miFormulario.get('estadoSeleccionado')?.value === 'C') {
    // Resto de tu lógica...
    console.log('Datos de la fila seleccionada:', orden);

    // Verifica si SerieAlmacen tiene al menos un elemento
    if (this.SerieAlmacen.length > 0) {
      if(this.selectedU_NReparto){
        // Verifica si la serie de la fila seleccionada coincide con alguna entrada en SerieAlmacen
      const coincideConAlgunAlmacen = this.SerieAlmacen.some(almacen => 
        orden.WhsName === almacen.WhsName || orden.WhsCode === almacen.WhsCode
      );

      if (coincideConAlgunAlmacen) {
        // Desestructura la primera fila de elementosTablaRefacciones
        const primeraFila = this.elementosTablaRefacciones[0];

        // Asigna los valores de la fila seleccionada a la primera fila de elementosTablaRefacciones
        primeraFila.NoParte = '';
        primeraFila.Descripcion = orden.ItemName;
        primeraFila.Cantidad = '';
        primeraFila.CC = '';
        primeraFila.SC = '';
        primeraFila.U_GoodsSerial = '';
        primeraFila.Almacen = orden.WhsName;
        primeraFila.Existencia = '';
        primeraFila.original = true;
       // this.refacciones = false;

        // Muestra una alerta de éxito
        Swal.fire({
          title: 'Éxito',
          text: 'La fila seleccionada coincide con uno de los almacenes por serie seleccionado.',
          icon: 'success'
        });
      } else {
        //this.refacciones = false;

        // Si la serie no coincide con ningún almacen, muestra un mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'La fila seleccionada no coincide con ninguno de los almacenes por serie seleccionado.',
          icon: 'error'
        });
      }
      }else {
        // this.refacciones = false;
         // Maneja el caso en que SerieAlmacen está vacío
         Swal.fire({
           title: 'Error',
           text: 'El select de Reparto está vacío.',
           icon: 'error'
         });
         console.error('Error: N.Reparto está vacío');
        }
      
    } else {
     // this.refacciones = false;
      // Maneja el caso en que SerieAlmacen está vacío
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
onrowDobleClickcotizacion(cotizacion: any) {
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
          // Iterar sobre los detalles y agregar una fila por cada uno
          detallesCotizacion.forEach(detalle => {
           //this.ingredient = 'CC';
            const nuevaFila = {
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
            
            //console.log('Esta es la tabla con los detalles de cotizacion', this.elementosTablaRefacciones)
          });
        }
      );

      const opcion = `${cotizacion.SeriesName} - ${cotizacion.DocNum}`;
      if (!this.opcionesCotizaciones.includes(opcion)) {
        // Agrega la nueva opción al arreglo
        this.opcionesCotizaciones.push(opcion);

        // Asigna el nuevo arreglo de opciones al p-dropdown
        this.miFormulario.get('dropdownCotizaciones')?.setValue(this.opcionesCotizaciones);

        
      } else {
       
        console.warn('La opción ya existe en el arreglo.');
      }

      // Muestra un mensaje de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'La fila seleccionada coincide con la serie seleccionada.',
        icon: 'success'
      });
      console.log('Éxito: La propiedad SeriesName coincide con el valor de Code.');
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

  // Cierra el modal u realiza otras acciones si es necesario
  
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
}*/

/*
onrowDobleClickcotizacion0(cotizacion: any) {
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
            // Iterar sobre los detalles y agregar una fila por cada uno
            detallesCotizacion.forEach(detalle => {
              const nuevaFila = {
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
          }
        );

        const opcion = `${cotizacion.SeriesName} - ${cotizacion.DocNum}`;

        // Verifica si la opción ya existe en el arreglo
        const existeEnArreglo = this.opcionesCotizaciones.some(op => op === opcion);

        if (!existeEnArreglo) {
          // Agrega la nueva opción al arreglo
          
          this.opcionesCotizaciones.push(opcion);

          // Asigna el nuevo arreglo de opciones al p-dropdown
          this.miFormulario.get('dropdownCotizaciones')?.setValue(this.opcionesCotizaciones);


        } else {
          // Muestra un mensaje de error si la opción ya existe
          Swal.fire({
            title: 'Error',
            text: 'La cotización ya está cargada.',
            icon: 'error'
          });
          console.error('Error: La cotización ya está cargada.');
        }

        // Muestra un mensaje de éxito
        Swal.fire({
          title: 'Éxito',
          text: 'La fila seleccionada coincide con la serie seleccionada.',
          icon: 'success'
        });
        console.log('Éxito: La propiedad SeriesName coincide con el valor de Code.');
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
}*/

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


/*
onEliminarFilaRef(elemento:any){
  const indice = this.elementosTablaRefacciones.indexOf(elemento);
  if (indice !== -1) {
    this.elementosTablaRefacciones.splice(indice, 1);
  }
}*/

onEliminarFilaRef(elemento: any) {
  // Obtén la fila original
  const filaOriginal = this.elementosTablaRefacciones.find(fila => fila.original);

  // Verifica si la fila a eliminar es la fila original
  if (elemento === filaOriginal) {
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


// Agrega este método para manejar el clic en el botón -Cotizacion


onEliminarCotizacion() {
  // Verifica si hay una opción seleccionada
  if (this.opcionSeleccionada) {
    // Obtiene el DocEntry de la cotización seleccionada
    const docEntryCotizacion = parseInt(this.opcionSeleccionada.split(' - ')[1]);
    console.log('DocEntry', docEntryCotizacion)
    // Filtra los detalles de cotización asociados al DocEntry de la cotización seleccionada
    const detallesCotizacionSeleccionada = this.dDetallesCotizaciones.filter(
      detalle => detalle.DocEntry === docEntryCotizacion
    );

    // Imprime los detalles de la cotización seleccionada en la consola
    console.log('Detalles de la cotización seleccionada:', detallesCotizacionSeleccionada);

    // Luego puedes agregar aquí el código para eliminar las filas y la opción del dropdown

    // Muestra un mensaje de éxito
    Swal.fire({
      title: 'Éxito',
      text: 'Cotización eliminada con éxito.',
      icon: 'success'
    });
  } else {
    // Muestra un mensaje de error si no hay opción seleccionada
    Swal.fire({
      title: 'Error',
      text: 'No se ha seleccionado ninguna opción en el dropdown',
      icon: 'error'
    });
    console.error('Error: No se ha seleccionado ninguna opción en el dropdown.');
  }
}




onBotonMenosCotizacionClick() {
  const opcionSeleccionada = this.miFormulario.get('dropdownCotizaciones')?.value;

  if (opcionSeleccionada) {
    this.opcionSeleccionada = opcionSeleccionada;
    console.log('Opción seleccionada:', this.opcionSeleccionada);
    // Resto del código...
  } else {
    console.warn('No hay opción seleccionada en el dropdown.');
    // Puedes mostrar un mensaje o realizar otras acciones si es necesario
  }
}

onBotonMenosCotizacionClick1() {
  // Obtén el valor seleccionado del dropdown
  const opcionSeleccionada = this.miFormulario.get('dropdownCotizaciones')?.value;

  // Verifica si hay una opción seleccionada
  if (opcionSeleccionada) {
    // Asigna el valor de la opción seleccionada
    this.opcionSeleccionada = opcionSeleccionada;

    // Imprime en consola la opción seleccionada
    console.log('Opción seleccionada:', this.opcionSeleccionada);

    // Restringe las opciones a solo la seleccionada
    this.opcionesCotizaciones = [opcionSeleccionada];

    // Resto del código...
  } else {
    console.warn('No hay opción seleccionada en el dropdown.');
    // Puedes mostrar un mensaje o realizar otras acciones si es necesario
  }
}

onDropdownChange(event: any) {
  this.opcionSeleccionada = event.value;
  console.log('Opción seleccionada:', event.value);
  // Aquí puedes realizar acciones adicionales con la opción seleccionada si es necesario

  //this.cotizacionSeleccionada = event.value;
  //console.log('Cotización seleccionada:', this.cotizacionSeleccionada);
}



openNew3() {
 
  this.refacciones = true
 }

 cotizacion(){
  this.cotizaciones = true;
 }

  hideBT01Modal() {
    this.visibleBT01Modal = false;
  }
  
  hideMC01Modal() {
    this.visibleMC01Modal = false;
  }

  onEstadoSeleccionadoChange() {
    // Lógica según tus necesidades
    this.actualizarIndiceActivo();
  }

  private actualizarIndiceActivo() {
    let estadoSeleccionado = this.miFormulario.value.estadoSeleccionado;

    this.diagnosticoHabilitado = estadoSeleccionado === 'D';
    this.refaccionesHabilitado = estadoSeleccionado !== 'D';
    this.manoDeObraHabilitado = estadoSeleccionado !== 'D';
    this.tercerosHbilitado = estadoSeleccionado !== 'D';
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
