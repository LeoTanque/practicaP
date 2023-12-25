import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
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
 
 cities!: any[];
 searchText: string = '';


 
 submitted: boolean = false;

 productDialog: boolean = false;
 terceros:boolean=false;
 recomendaciones:boolean = false;
 refacciones: boolean = false;
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

selectedSeries: any;

tipoSeleccionado: string | undefined;


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
  {NoParte:'', Descripcion:'', Cantidad:'', CC:'', SC:'',U_GoodsSerial:'', Almacen:'', Existencia:'',}
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

indiceActivo: number = 0;

diagnosticoHabilitado: boolean = true;
refaccionesHabilitado: boolean = true;
manoDeObraHabilitado: boolean = true;
tercerosHbilitado: boolean = true;
recomendacionesHbilitado:boolean= true;
anexosHabilitado:boolean= true
panelActivo: string = 'diagnosticoPanel';

almacenSeleccionado: any | undefined;
compararAlmacen:any
//almacenSeleccionado:any[]=[]
constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosBT01();
    this.cargarDatosMC01();
    this.cargarDatosRefacciones();
    this.selectedSeries = null;
   // this.cargarDatosAdicionalesMC01();
  
  

    this.miFormulario = this.fb.group({
      tipoTrabajo: [''], // Puedes proporcionar un valor predeterminado si es necesario
      selectedSeries: [''],
      otroInput: [''],
      selectedSeriesInput: [''],
      fueraDeServicio: [''],
      prioridadSeleccionada:[''],
      estadoSeleccionado:[''],
      seleccionTecnico: [''],
      seleccionCoordinador: [''],
      seleccionarFormato: [''],
      
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


/*
cargarDatosSeriealmacen(serie:any){
  this.creacionOrdenesService.seriesAlmacen(serie).subscribe(
    (response)=>{
      if(response.ResultCode===0 && response.data){
        this.SerieAlmacen = response.data;
        console.log('Datos de almacen por serie', this.SerieAlmacen );
      }else{
        console.error('Error al obtener datos MC01 del API');
      }
    },
    (error) => {
      console.error('Error de conexión al API');
    
    }
  )
}*/

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

      //this.almacenSeleccionado = this.SerieAlmacen.map((almacen: { WhsName: any; WhsCode: any; }) => ({
        //label: almacen.WhsName,
        //value: almacen.WhsCode
      //}));
      console.log('Datos de almacen Seleccionado antes', this.almacenSeleccionado);

    }
  }
  
  

  
  
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
  }
  
  
  onRowDoubleClick(event: any, rowData: any, tipo: string, codigo:any) {
    this.cargarDatosAdicionalesMC01(tipo, codigo)
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
  const almacenSerieSeleccionada = this.SerieAlmacen[0];
  
  // Verifica si la serie de la fila seleccionada coincide con la serie seleccionada en el dropdown
  if (
    (orden.WhsName === almacenSerieSeleccionada.WhsName || orden.WhsCode === almacenSerieSeleccionada.WhsCode)
  ) {
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
      text: 'La fila seleccionada coincide con el almacen por serie seleccionado.',
      icon: 'success'
    });
  } else {
    this.refacciones = false;
    // Si la serie no coincide, muestra un mensaje de error
    Swal.fire({
      title: 'Error',
      text: 'La fila seleccionada no coincide con el almacen por serie seleccionado.',
      icon: 'error'
    });
  }
}*/

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
        text: 'La fila seleccionada coincide con al menos uno de los almacenes por serie seleccionado.',
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

onEliminarFilaRef(elemento:any){
  const indice = this.elementosTablaRefacciones.indexOf(elemento);
  if (indice !== -1) {
    this.elementosTablaRefacciones.splice(indice, 1);
  }
}

openNew3() {
 
  this.refacciones = true
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
  this.recomendaciones = false
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
