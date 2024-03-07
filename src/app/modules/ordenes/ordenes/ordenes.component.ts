import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, catchError, exhaustMap, finalize, map, of, throwError } from 'rxjs';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss'],
 // providers: [MessageService]
})
export class OrdenesComponent implements OnInit {

@ViewChild('dt') dt!: Table;

@ViewChild('dt') mc01Table!: Table;   

@ViewChild('tuTabView') tabView: any;
 globalFilterMC01: string = ''; 


 grabandoDatos: boolean = false;
 
 ingredient: any = 'SC';
 TipoExistencia:any = null;
 TipoExistencia1:boolean = true;
 
 checked: boolean = true;
 cities!: any[];
 searchText: string = '';

 isSubmitting: boolean = false;
 
 submitted: boolean = false;

 productDialog: boolean = false;
 terceros:boolean=false;
 recomendaciones:boolean = false;
 refacciones: boolean = false;
 cotizaciones:boolean= false
 manoDeObra:boolean = false;
 manoDeObraTecnicos: boolean = false

 agente: boolean = false;
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

 datosGrabados:any[]=[];

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

agenteVentas:any[]=[];

selectedProduct: any;

clienteProp: string = '';
nombreProp: string = '';
direccionProp: string = '';
ciudad:string ='';
ciudadProp:string = '';
otroInput: string = '';

valorActual: any;

tipoTrabajoSeleccionado: string = ''; // Puedes inicializarla con un valor predeterminado si es necesario

/*
elementosTabla: any[]=[
  {tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:'', U_OdomNue:''},
] */


elementosTabla: any[] = [
  { U_TipEqu: null, U_NReparto: '', U_NumEcon: '', U_GoodsBrand: '', U_GoodsModel: '', U_GoodsSerial: '', U_OdoAct: '', U_OdomNue: null }
];



elementosTablaRefacciones:any[]=[
  {U_ItemCode:'', U_ItemName:'', U_Quantity:'', CC:'', SC:'',U_NorRep:'', Almacen:'', U_Existencia:'',original: true }
]

Existencia:any = '';


selectedU_NReparto: any = '';



Solicitud:any=[
  {label:'-', value:''},
  {label: 'Solicitado', value:'S'},
  {label: 'No Solicitado', value:'N'},
]

select:any='';

prioridades: any[] = [
  { label: 'Alta', value: 'A' },
  { label: 'Normal', value: 'N' },
  { label: '-', value: '-' },
];
  cardNameInput1:any;

prioridadValidator(control: AbstractControl): { [key: string]: boolean } | null {
  // Asegura que el valor no sea '-'
  return control.value === '-' ? { 'invalidPrioridad': true } : null;
}

estados:any[]=[
  
  {label:'Diagnóstico', value:'D'},
  {label:'Cotización', value: 'C'},
  {label:'Autorización', value:'A'},
  {label:'Espera de Partes', value:'P'},
  {label:'Ejecucion', value:'E'}
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

cardcode: any = '';

cotizacionSeleccionadaDocEntry: number | undefined;


//Mano de obra 
dManoDeObra:any[]=[];
elementosTablaManoDeObra:any[]=[
  {U_ItemCode:'', U_ItemName:'', U_HorSer: '', U_Quantity: '', U_CodTec:'', U_NomTec:'',U_FecSer:'', U_HorSerR:'', U_End:'' }
]



ultimaPosicionCreada: number = -1;

codigoTecnicoSeleccionado: any = '';
nombreTecnicoSeleccionado: any = '';

tecnicosSeleccionados: { [key: number]: { codigo: any, nombre: any } } = {};


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


fechaSeleccionadatablas: Date = new Date();
datos:any[]=[]

selectedOrden: any; // Definir el tipo adecuado según la estructura de tus órdenes
ordenes: any[]=[];

modoEdicion = false;
docEntry: number | null = null;

archivos: any[] = [];

constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute){}


  ngOnInit(): void {

    
    this.route.params.subscribe(params => {
      this.docEntry = params['docEntry'];
    
      if (this.docEntry) {
        this.modoEdicion = true;
        // Estás editando, llama al servicio para obtener detalles y actualiza tu formulario

        /*
        this.creacionOrdenesService.obtenerDetalleOrden(this.docEntry).subscribe(
          (response: any) => {
            if (response && response.data) {
              // Actualiza tu formulario con los detalles de la orden
              const datosMapeados = {
                tipoTrabajo: response.data.U_TipTra,
                selectedSeries: response.data.U_Series,
                otroInput: response.data.U_OtroInput,
                selectedSeriesInput: response.data.U_DocNum,
                selectedFallos: response.data.U_CodFall,
                reportadoPor: response.data.U_PerRep,
                autorizadoPor: response.data.U_PerAut,
                fueraDeServicio: response.data.U_FueSer,
                prioridadSeleccionada: response.data.U_Prior,
                fechaSeleccionada: new Date(response.data.U_DocDate),
                estadoSeleccionado: response.data.U_Status,
                seleccionAgente: response.data.U_AgVent,
                seleccionTecnico: response.data.U_TecResp,
                seleccionCoordinador: response.data.U_Coord,
                seleccionarFormato: response.data.U_ComTra,
                dropdownCotizaciones: response.data.U_DocCot,
                U_ProRep: response.data.U_ProRep,
                cliente: response.data.U_CardCode,
                nombre: response.data.U_CardName,
                direccion: response.data.U_Address,
                ciudad: response.data.U_City,
                telefono: response.data.U_Phone,
                contrato: response.data.U_OrdCom,
                textoDiagnostico: response.data.U_ComTra,
                // ... continua mapeando las demás propiedades ...


              };
              this.miFormulario.patchValue(datosMapeados);
   
               
              if (response.data.DVP_WOR7Collection && Array.isArray(response.data.DVP_WOR7Collection) && response.data.DVP_WOR7Collection.length > 0) {
                this.elementosTabla = [{
                  //tipo: response.data.tipoEquipoNombre,
              U_TipEqu: response.data.DVP_WOR7Collection[0].U_TipEqu,
              U_NumEcon: response.data.DVP_WOR7Collection[0].U_NumEcon,
              U_NReparto: response.data.DVP_WOR7Collection[0].U_NorRep,
              U_GoodsBrand: response.data.DVP_WOR7Collection[0].U_Marca,
              U_GoodsModel: response.data.DVP_WOR7Collection[0].U_Modelo,
              U_GoodsSerial: response.data.DVP_WOR7Collection[0].U_Serie,
              U_OdoAct: response.data.DVP_WOR7Collection[0].U_OdomAct,
                  U_OdomNue: response.data.DVP_WOR7Collection[0].U_OdomNue !== undefined ? response.data.DVP_WOR7Collection[0].U_OdomNue : null,
                }];
                if (this.elementosTabla.length > 0) {
                  this.miFormulario.controls['U_OdomNue'].setValue(this.elementosTabla[0].U_OdomNue);
                }
              }

              
              console.log('Carga de datos', response.data);
            } else {
              console.error('La respuesta no tiene la estructura esperada', response);
              // Puedes manejar el caso en el que la respuesta no tenga la estructura esperada
            }
          },
          error => {
            console.error('Error al obtener detalles de la orden para editar', error);
            // Puedes manejar el error según tus necesidades
          }
        );*/

        this.cargarDatosOrden(this.docEntry)
      }
    });
    

    this.cargarDatos();
    this.cargarDatosBT01();
    this.cargarDatosMC01();
    this.cargarDatosRefacciones();
    this.selectedSeries = null;
   
    this.cargarDatosManoDeObra();
    this.cargarDatosProveedoresTerceros()
   // this.cargarDatosOrdenTerceros()
    this.cargarDatosRecomendaciones()

    this.cargarDatosAgenteVentas();

    this.miFormulario = this.fb.group({
      tipoTrabajo: ['', Validators.required], 
      selectedSeries: ['', Validators.required],
      otroInput: [''],
      selectedSeriesInput: [''],
      selectedFallos:['', Validators.required],
      reportadoPor:[''],
      autorizadoPor:['', Validators.required],
      fueraDeServicio: [''],
      //prioridadSeleccionada:['A', [Validators.required, this.prioridadValidator]],
      prioridadSeleccionada:['A', Validators.required],
      fechaSeleccionada: [new Date()],
      estadoSeleccionado:['D', Validators.required],
      seleccionAgente:[''],
      codigoAgente:[''],
      seleccionTecnico: ['', Validators.required],
      seleccionCoordinador: ['', Validators.required],
      seleccionarFormato: [''],
      textoDiagnostico:['', Validators.required],
     // listaTrabajos:[''],
      dropdownCotizaciones: [''],
      U_ProRep:[''],
      U_CardCode: [''],
      U_CardName: [''],
      direccion: [''],
      ciudad: [''],
      telefono: [''],
      contrato: [''],
     // ocOt: [''],
     U_OdomNue:[null, [Validators.required]],
     U_TipEqu:['', Validators.required],
     elementosTabla: this.fb.array([]),
     NoParte: [''],
     Descripcion: [''],
     Cantidad: [''],
     Proveedor:[''],
     OrdenCompra:[''],
    

     
    });

    this.valorActual = this.miFormulario.value.tipoTrabajo;
    this.actualizarIndiceActivo();
   
   // this.onEstadoSeleccionadoChange1({ value: 'D' });  
   
  }

  get f() {
    return this.miFormulario.controls;
  }

  /*
  private cargarDatosOrden(docEntry: number): void {
    // Llama al servicio para obtener detalles y actualiza tu formulario
    this.creacionOrdenesService.obtenerDetalleOrden(docEntry).subscribe(
      (response: any) => {
        if (response && response.data) {
          // Actualiza tu formulario con los detalles de la orden
          const datosMapeados = {
            tipoTrabajo: response.data.U_TipTra,
            selectedSeries: response.data.U_Series,
            otroInput: response.data.U_OtroInput,
            selectedSeriesInput: response.data.U_DocNum,
            selectedFallos: response.data.U_CodFall,
            reportadoPor: response.data.U_PerRep,
            autorizadoPor: response.data.U_PerAut,
            fueraDeServicio: response.data.U_FueSer,
            prioridadSeleccionada: response.data.U_Prior,
            fechaSeleccionada: new Date(response.data.U_DocDate),
            estadoSeleccionado: response.data.U_Status,
            seleccionAgente: response.data.U_AgVent,
            seleccionTecnico: response.data.U_TecResp,
            seleccionCoordinador: response.data.U_Coord,
            seleccionarFormato: response.data.U_ComTra,
            dropdownCotizaciones: response.data.U_DocCot,
            U_ProRep: response.data.U_ProRep,
            cliente: response.data.U_CardCode,
            nombre: response.data.U_CardName,
            direccion: response.data.U_Address,
            ciudad: response.data.U_City,
            telefono: response.data.U_Phone,
            contrato: response.data.U_OrdCom,
            textoDiagnostico: response.data.U_ComTra,
            DVP_WOR7Collection: response.data.DVP_WOR7Collection || [],

        
            
          };

         

          if (response.data.DVP_WOR7Collection && Array.isArray(response.data.DVP_WOR7Collection) && response.data.DVP_WOR7Collection.length > 0) {
            this.elementosTabla = response.data.DVP_WOR7Collection.map((elemento: any) => ({
              U_TipEqu: elemento.U_TipEqu,
              U_NumEcon: elemento.U_NumEcon,
              U_NReparto: elemento.U_NorRep,
              U_GoodsBrand: elemento.U_Marca,
              U_GoodsModel: elemento.U_Modelo,
              U_GoodsSerial: elemento.U_Serie,
              U_OdoAct: elemento.U_OdomAct,
              U_OdomNue: elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : null,
            }));

            if (this.elementosTabla.length > 0) {
              this.miFormulario.controls['U_OdomNue'].setValue(this.elementosTabla[0].U_OdomNue);
            }
          
          this.miFormulario.patchValue(datosMapeados);
          
          }
          
         

          console.log('Carga de datos', response.data);

          const jsonBody = JSON.stringify(response.data);
          console.log(jsonBody)
        } else {
          console.error('La respuesta no tiene la estructura esperada', response);
          // Puedes manejar el caso en el que la respuesta no tenga la estructura esperada
        }
      },
      error => {
        console.error('Error al obtener detalles de la orden para editar', error);
        // Puedes manejar el error según tus necesidades
      }
    );
  }*/


  
  private cargarDatosOrden(docEntry: number): void {
    // Llama al servicio para obtener detalles y actualiza tu formulario
    
    this.creacionOrdenesService.obtenerDetalleOrden(docEntry).subscribe(
        (response: any) => {
            if (response && response.data) {
                // Actualiza tu formulario con los detalles de la orden
                const datosMapeados = {
                    tipoTrabajo: response.data.U_TipTra,
                    selectedSeries: response.data.U_Series,
                    otroInput: response.data.U_OtroInput,
                    selectedSeriesInput: response.data.U_DocNum,
                    selectedFallos: response.data.U_CodFall,
                    reportadoPor: response.data.U_PerRep,
                    autorizadoPor: response.data.U_PerAut,
                    fueraDeServicio: response.data.U_FueSer,
                    prioridadSeleccionada: response.data.U_Prior,
                    fechaSeleccionada: new Date(response.data.U_DocDate),
                    estadoSeleccionado: response.data.U_Status,
                    seleccionAgente: response.data.U_NomAgVent,
                    seleccionTecnico: response.data.U_TecResp,
                    seleccionCoordinador: response.data.U_Coord,
                    seleccionarFormato: response.data.U_ComTra,
                    dropdownCotizaciones: response.data.U_DocCot,
                    U_ProRep: response.data.U_ProRep,
                    U_CardCode: response.data.U_CardCode,
                    U_CardName: response.data.U_CardName,
                    direccion: response.data.U_Address,
                    ciudad: response.data.U_City,
                    telefono: response.data.U_Phone,
                    contrato: response.data.U_OrdCom,
                    textoDiagnostico: response.data.U_ComTra,
                    DVP_WOR7Collection: response.data.DVP_WOR7Collection || [],
                  
                    DVP_WOR1Collection: response.data.DVP_WOR1Collection || [],
                    DVP_WOR2Collection: response.data.DVP_WOR2Collection || [],
                    DVP_WOR5Collection: response.data.DVP_WOR5Collection || [],
                
                };

                if (response.data.U_Series) {
                  this.cargarDatosSeriealmacen(response.data.U_Series);
                  this.elementosTablaRefacciones.forEach(orden => {
                    orden.Almacen = this.almacenSeleccionado;
                    
                  });
                }

                if(response.data.U_TipTra){
                  let codigo = response.data.U_CardCode;
                  let tipo = response.data.U_TipTra
               this.cargarDatosAdicionalesMC01(tipo, codigo)
               console.log('datos adicionales', tipo, codigo)
                }
              

                if (response.data.DVP_WOR1Collection && Array.isArray(response.data.DVP_WOR1Collection)) {
                  this.elementosTablaRefacciones = response.data.DVP_WOR1Collection.map((cotizacion: any) => ({
                  
                    LineId: cotizacion.LineId,
                    U_ItemCode: cotizacion.U_ItemCode,
                    U_ItemName: cotizacion.U_ItemName,
                    U_Quantity: cotizacion.U_Quantity,
                    U_CarCli: "Y", // Supongo que estos valores son fijos, ajusta según tus necesidades
                    U_CarEmp: "N",
                    U_InCot: null,
                    U_Ins: null,
                    U_StaAlm: null,
                    U_DocEnt: null,
                    U_DocSal: null,
                    U_LinDocSal: null,
                    U_AlmEnt: cotizacion.U_AlmEnt,
                   // U_AlmEnt: this.almacenSeleccionado , // Ajusta según tus necesidades
                    U_AlmSal: null,
                   // U_CotVen: 4534,
                    U_CotVen: cotizacion.DocEntry,// Ajusta según tus necesidades
                    U_LinCot: null,
                    U_OrdVen: null,
                    U_LinOrdVen: null,
                    U_StaSol: null,
                    U_OrdCom: null,
                    U_LinOrdCom: null,
                    U_TipDocSal: null,
                    U_Factura: null,
                    U_LinFactura: null,
                    U_Entregado: null,
                    U_InvIt: null,
                    U_EsSer: null,
                    U_CodTec: null,
                    U_NomTec: null,
                    U_FecSer: null,
                    U_End: null,
                    U_HorSer: 0.0,
                    U_HorSerR: 0.0,
                    U_Existencia: cotizacion.U_Existencia,
                    U_NorRep: cotizacion.U_NorRep,
                    
                    
             
           
                  }));
                }



                this.elementosTablaRefacciones.forEach(orden => {
                  this.selectedU_NReparto = orden.U_NorRep;
                  if(orden.original){
                    orden.original = 'SC';
                  }else{
                    orden.original = 'CC'
                  }
                 
                 
              });

                if (!this.fechaSeleccionadatablas) {
                  this.fechaSeleccionadatablas = new Date(response.data.U_DocDate);
              }

                if (response.data.DVP_WOR2Collection && Array.isArray(response.data.DVP_WOR2Collection)) {
                  this.elementosTablaManoDeObra = response.data.DVP_WOR2Collection.map((ManoDeObra: any) => ({
                    LineId: ManoDeObra.LineId,
                    U_ItemCode: ManoDeObra.U_ItemCode,
                    U_ItemName: ManoDeObra.U_ItemName,
                    U_CodTec: ManoDeObra.U_CodTec, 
                    U_NomTec: ManoDeObra.U_NomTec,
                    U_FecSer: ManoDeObra.U_FecSer,
                    U_End: ManoDeObra.U_End === 'S',
                    U_HorSer: ManoDeObra.U_HorSer, 
                    U_HorSerR: ManoDeObra.U_HorSerR, 
                    U_Quantity:ManoDeObra.U_Quantity, 
                  }));
                }

                if (response.data.DVP_WOR3Collection && Array.isArray(response.data.DVP_WOR3Collection)) {
                  this.elementosTablaTerceros = response.data.DVP_WOR3Collection.map((terceros: any) => ({
                     // LineId: archivo.LineId,
                      LineId: terceros.LineId,
                      U_CardCode: terceros.U_CardCode,
                      U_CardName: terceros.U_CardName,
                      U_DocNumOC: terceros.U_DocNumOC, 
                      U_DocTotal: terceros.U_DocTotal
                  }));
              }

              if (response.data.DVP_WOR4Collection && Array.isArray(response.data.DVP_WOR4Collection)) {
                this.elementosTablaRecomendaciones = response.data.DVP_WOR4Collection.map((recomendacion: any) => ({
                    LineId: recomendacion.LineId,
                   U_ItemCode: recomendacion.U_ItemCode,
                   U_ItemName: recomendacion.U_ItemName,
                   U_Quantity: recomendacion.U_Quantity, 
                }));
            }
                


                

                if (response.data.DVP_WOR5Collection && Array.isArray(response.data.DVP_WOR5Collection)) {
                  this.archivos = response.data.DVP_WOR5Collection.map((archivo: any) => ({
                      LineId: archivo.LineId,
                      VisOrder: archivo.VisOrder,
                      Object: archivo.Object,
                      LogInst: archivo.LogInst,
                      U_Descripcion: archivo.U_Descripcion,
                      U_File: archivo.U_File,
                      U_NomFile: archivo.U_NomFile,
                      U_NomSys: archivo.U_NomSys,
                      U_TipAnex: archivo.U_TipAnex,
                      U_Filebase64: archivo.U_Filebase64
                  }));
              }
                
                if (response.data.DVP_WOR7Collection && Array.isArray(response.data.DVP_WOR7Collection)) {
                    this.elementosTabla = response.data.DVP_WOR7Collection.map((elemento: any) => ({
                      
                        U_TipEqu: elemento.U_TipEqu,
                        //U_TipEqu:elemento.tipoTrabajoSeleccionado,
                        U_NumEcon: elemento.U_NumEcon,
                        U_NReparto: elemento.U_NorRep,
                        U_GoodsBrand: elemento.U_Marca,
                        U_GoodsModel: elemento.U_Modelo,
                        U_GoodsSerial: elemento.U_Serie,
                        U_OdoAct: elemento.U_OdomAct,
                        U_OdomNue: elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : null,
                       // U_OdomNue: elemento.U_OdomNue 
                    }));

                    if (this.elementosTabla.length > 0) {
                      this.miFormulario.controls['U_OdomNue'].setValue(this.elementosTabla[0].U_OdomNue);
                    
                    }

                    
                    
                   
                    if (this.elementosTabla.length > 0) {
                      // Asigna el valor de U_TipEqu para cada fila en elementosTabla
                      this.elementosTabla.forEach((elemento, index) => {
                          this.miFormulario.get(`elementosTabla.${index}.U_TipEqu`)?.setValue(elemento.U_TipEqu);
                      });
                  }
                  

                    /*
                    const U_OdomNueArray = this.elementosTabla.map(elem => elem.U_TipEqu);
                    console.log('Valores de U_OdomNueArray:', U_OdomNueArray);
                // Asignar el arreglo U_OdomNueArray al control U_OdomNue en el formulario
                this.miFormulario.controls['U_OdomNue'].setValue(U_OdomNueArray);
                    */


                    const ultimaPosicionVacia = this.elementosTabla[this.elementosTabla.length - 1].U_TipEqu === null;

                    if (!ultimaPosicionVacia) {
                        this.elementosTabla.push({
                            U_TipEqu: null,
                            U_NumEcon:'',
                            U_NReparto: '',
                            U_GoodsBrand: '',
                            U_GoodsModel: '',
                            U_GoodsSerial: '',
                            U_OdoAct: '',
                            U_OdomNue: null,
                        });
                    }

                    
                }

                


                this.miFormulario.patchValue(datosMapeados);
                console.log('Carga de datos', response.data);
                this.actualizarIndiceActivo();
                const jsonBody = JSON.stringify(response.data);
                console.log(jsonBody)

            } else {
                console.error('La respuesta no tiene la estructura esperada', response);
            }
        },
        error => {
            console.error('Error al obtener detalles de la orden para editar', error);
        }
    );
}



  grabarOrden1() {
    
      // El formulario es válido, procede a enviar los datos al servicio
      const valoresFormulario = this.miFormulario.value;
      /*
      const tipoEquipoSeleccionado = this.miFormulario.get('U_TipEqu')?.value;
      const tipoEquipoNombre = tipoEquipoSeleccionado ? tipoEquipoSeleccionado.Code : '';
*/
      const tipoEquipoNombre = this.tipoTrabajoSeleccionado;

     console.log('nombre del equipo', tipoEquipoNombre)

     const uNorRepValue = this.selectedU_NReparto;
     const almacen = this.almacenSeleccionado;
     const valoresUOdomNue = this.elementosTabla.map(elemento => elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : null);
     //const valoresUOdomNue = this.elementosTabla.map(elemento => elemento.U_OdomNue);

     const valoresUExistencia = this.elementosTablaRefacciones.map((elemento) => elemento.Existencia);
     
     //const valoresUExistencia = this.elementosTablaRefacciones.map(elemento => elemento.Existencia).filter(existencia => existencia !== '');
     //const valoresUExistencia = this.elementosTablaRefacciones[index]?.Existencia || '';


     
     const detallesCotizacionesParaAPI = this.elementosTablaRefacciones.map((detalle, index) => ({
      //LineId: null,
      LineId: index + 1,
      U_ItemCode: detalle.ItemCode,
      U_ItemName: detalle.Dscription,
      U_Quantity: detalle.Quantity,
      U_CarCli: "Y", // Supongo que estos valores son fijos, ajusta según tus necesidades
      U_CarEmp: "N",
      U_InCot: null,
      U_Ins: null,
      U_StaAlm: null,
      U_DocEnt: null,
      U_DocSal: null,
      U_LinDocSal: null,
      U_AlmEnt: "08", // Ajusta según tus necesidades
      U_AlmSal: null,
     // U_CotVen: 4534,
      U_CotVen: detalle.DocEntry,// Ajusta según tus necesidades
      U_LinCot: null,
      U_OrdVen: null,
      U_LinOrdVen: null,
      U_StaSol: null,
      U_OrdCom: null,
      U_LinOrdCom: null,
      U_TipDocSal: null,
      U_Factura: null,
      U_LinFactura: null,
      U_Entregado: null,
      U_InvIt: null,
      U_EsSer: null,
      U_CodTec: null,
      U_NomTec: null,
      U_FecSer: null,
      U_End: null,
      U_HorSer: 0.0,
      U_HorSerR: 0.0,
      //U_Existencia: 0.0,
      U_Existencia: this.elementosTablaRefacciones[index +1]?.Existencia || '',
      //U_Existencia: detalle.Existencia !== undefined ? detalle.Existencia : 0, // Se usa un valor por defecto (0) si Existencia es undefined
      //U_NorRep: detalle.NorRep,
       U_NorRep: uNorRepValue, // Ajusta según tus necesidades
    }));

    const elementos = this.elementosTablaRefacciones.map((detalle, index) => ({
      LineId: index + 1,
      U_NorRep: uNorRepValue,
      
    }));


/*
const fecha = this.fechaSeleccionadatablas;

  const dvpWor2Collection = this.elementosTablaManoDeObra.map((nuevaManoDeObra, index) => ({
    LineId: index + 1, // Ajusta el LineId según tus necesidades
    U_ItemCode: nuevaManoDeObra.Articulo,
    U_ItemName: nuevaManoDeObra.Nombres,
    U_CodTec: nuevaManoDeObra.Code,
    U_NomTec: nuevaManoDeObra.Name,
    U_FecSer: fecha,
    U_End: nuevaManoDeObra.Ejecutada === 'ejecutada' ? 'S' : 'N', // Suponiendo que Ejecutada es un booleano
    U_HorSer: '', // Convertir a número, si es necesario
    U_HorSerR: '', // Convertir a número, si es necesario
    U_Quantity: this.elementosTablaManoDeObra[index +1]?.Cantidad || '', // Convertir a número, si es necesario
}));
*/

     const dvpWor7Collection = this.elementosTabla.slice(0, -1).map((elemento, index) => ({
      
      LineId: index + 1,
     // U_TipEqu: tipoEquipoNombre,
      U_TipEqu: elemento.U_TipEqu,
      U_NumEcon: elemento.U_NumEcon,
      U_NorRep: elemento.U_NReparto,
      U_Marca: elemento.U_GoodsBrand,
      U_Modelo: elemento.U_GoodsModel,
      U_Serie: elemento.U_GoodsSerial,
      U_OdomAct: elemento.U_OdoAct,
      U_OdomNue: elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : this.miFormulario.get('U_OdomNue')?.value,
      //U_OdomNue: valoresUOdomNue[index],
    }));

      const bodyParaAPI = {
        DocEntry: 64,
        DocNum: 64,
        Series: -1,
        U_LastPref: null,
        U_ConFlo: null,
        U_DocNum: valoresFormulario.selectedSeriesInput,
        U_Series: valoresFormulario.selectedSeries,
        U_Prefix: null,
        U_TipTra: valoresFormulario.tipoTrabajo,
        U_RefOrdTra: null,
        U_CardCode: valoresFormulario.cliente,
        U_CardName: valoresFormulario.nombre,
        U_Address: valoresFormulario.direccion,
        U_City: valoresFormulario.ciudad,
        U_Phone: valoresFormulario.telefono,
        U_OrdCom: null,
        U_PDFOC: null,
        U_NomSysOC: null,
        U_Status: valoresFormulario.estadoSeleccionado,
        U_DocDate: valoresFormulario.fechaSeleccionada,
        U_FecEspPar: null,
        U_Prior: valoresFormulario.prioridadSeleccionada,
        U_AgVent: valoresFormulario.codigoAgente,
        U_NomAgVent: valoresFormulario.seleccionAgente, // Ajusta según tu lógica
        U_PerAut: valoresFormulario.autorizadoPor,
        U_PerRep: valoresFormulario.reportadoPor,
        U_CodFall: valoresFormulario.selectedFallos,
        U_ProRep: valoresFormulario.U_ProRep,
        U_ComTra: valoresFormulario.textoDiagnostico,
        U_ComRec: null,
        U_ComRef: null,
        U_ComMan: null,
        U_ComRep: null,
        U_Com: null,
        U_ComClosed: null,
        U_TipEqu: null,
        U_NumEcon: null,
        U_Marca: null,
        U_Modelo: null,
        U_Serie: null,
        U_Closed: null,
        U_Ended: null,
        U_Odom: null,
        U_EndRec: null,
        U_StartD: null,
        U_EndD: null,
        U_HasD: null,
        U_HorasMan: null,
        U_StartC: null,
        U_EndC: null,
        U_HasC: null,
        U_StartA: null,
        U_EndA: null,
        U_HasA: null,
        U_StartP: null,
        U_EndP: null,
        U_HasP: null,
        U_StartE: null,
        U_EndE: null,
        U_HasE: null,
        U_DocT: null,
        U_DocR: null,
        U_DocCot: null,
        U_DocFac: null,
        U_EnTras: null,
        U_FueSer: null,
        U_NorRep: null,
        U_TecResp: valoresFormulario.seleccionTecnico,
        U_Coord: valoresFormulario.seleccionCoordinador,
        U_ManObrCap: null,
        DVP_WOR1Collection: null,
       // DVP_WOR1Collection:elementos,
        DVP_WOR2Collection: null,
       // DVP_WOR2Collection: dvpWor2Collection,
        DVP_WOR3Collection: null,
        DVP_WOR4Collection: null,
        DVP_WOR5Collection: null,
        DVP_WOR6Collection: null,
        DVP_WOR7Collection: dvpWor7Collection,
       
       /*
        DVP_WOR7Collection: []= [{
          LineId: 1, // Asegura que LineId sea único
          U_TipEqu:tipoEquipoNombre,
          U_NumEcon: this.elementosTabla[0].U_NumEcon,
          U_NorRep: this.elementosTabla[0].U_NReparto,
          U_Marca: this.elementosTabla[0].U_GoodsBrand,
          U_Modelo: this.elementosTabla[0].U_GoodsModel,
          U_Serie: this.elementosTabla[0].U_GoodsSerial,
          U_OdomAct: this.elementosTabla[0].U_OdoAct,
          U_OdomNue: this.elementosTabla[0].U_OdomNue !== undefined ? this.elementosTabla[0].U_OdomNue : this.miFormulario.get('U_OdomNue')?.value,
        }],
        */
      };

      console.log('Valores mandados al api', bodyParaAPI);
      // Llama al servicio para guardar los datos en el API
      const jsonBody = JSON.stringify(bodyParaAPI);
    console.log(jsonBody)

    if (this.miFormulario.valid) {
      // Llama al servicio para enviar los datos
      this.creacionOrdenesService.grabarOrdenTrabajo(bodyParaAPI).subscribe(
        (respuesta) => {
          
          // Manejar la respuesta del servicio según sea necesario
          console.log('Respuesta del servicio:', respuesta);
          Swal.fire({
            title: "Exito",
            text: "OT Grabado con Exito",
            icon: "success"
          });
          
        },
        (error) => {
          // Manejar errores si es necesario
          console.error('Error en la petición:', error);
          Swal.fire({
            title: "Error",
            text: "Error al llamar al API",
            icon: "error"
          });
          return;
        }
      );
    } else {
      // El formulario no es válido, muestra un mensaje con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar los campos del formulario',
      });

    }
    
  }

  

  grabarOrden() {
    // El formulario es válido, procede a enviar los datos al servicio
    const valoresFormulario = this.miFormulario.value;
    const tipoEquipoNombre = this.tipoTrabajoSeleccionado;
    const uNorRepValue = this.selectedU_NReparto;
    const almacen = this.almacenSeleccionado;
    const valoresUOdomNue = this.elementosTabla.map(elemento => elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : null);
    const valoresUExistencia = this.elementosTablaRefacciones.map((elemento) => elemento.Existencia);
  
    

    const detallesCotizacionesParaAPI1 = this.elementosTablaRefacciones.map((detalle, index) => ({
      //LineId: null,
      LineId: index + 1,
      U_ItemCode: detalle.U_ItemCode,
      U_ItemName: detalle.U_ItemName,
      U_Quantity: detalle.U_Quantity,
      U_CarCli: "Y", // Supongo que estos valores son fijos, ajusta según tus necesidades
      U_CarEmp: "N",
      U_InCot: null,
      U_Ins: null,
      U_StaAlm: null,
      U_DocEnt: null,
      U_DocSal: null,
      U_LinDocSal: null,
      U_AlmEnt: detalle.Almacen, // Ajusta según tus necesidades
      U_AlmSal: null,
     // U_CotVen: 4534,
      U_CotVen: detalle.DocEntry,// Ajusta según tus necesidades
      U_LinCot: null,
      U_OrdVen: null,
      U_LinOrdVen: null,
      U_StaSol: null,
      U_OrdCom: null,
      U_LinOrdCom: null,
      U_TipDocSal: null,
      U_Factura: null,
      U_LinFactura: null,
      U_Entregado: null,
      U_InvIt: null,
      U_EsSer: null,
      U_CodTec: null,
      U_NomTec: null,
      U_FecSer: null,
      U_End: null,
      U_HorSer: 0.0,
      U_HorSerR: 0.0,
      U_Existencia: detalle.U_Existencia,
      U_NorRep: uNorRepValue, // Ajusta según tus necesidades
      //U_NorRep: detalle.U_NorRep
    }));

    const elementosFiltrados = this.elementosTablaManoDeObra.filter((manoDeObra, index) => index !== 0 && manoDeObra.Articulo !== '');
    const fecha = this.fechaSeleccionadatablas;

    const dvpWor2Collection = elementosFiltrados.map((nuevaManoDeObra, index) => ({
      LineId: index + 1,
      U_ItemCode: nuevaManoDeObra.U_ItemCode,
      U_ItemName: nuevaManoDeObra.U_ItemName,
      U_CodTec: this.codigoTecnicoSeleccionado, 
      U_NomTec: this.nombreTecnicoSeleccionado,
      U_FecSer: fecha,
      U_End: nuevaManoDeObra.U_End ? 'S' : 'N',
      U_HorSer: nuevaManoDeObra.U_HorSer, 
      U_HorSerR: nuevaManoDeObra.U_HorSerR, 
      U_Quantity: nuevaManoDeObra.U_Quantity,
    }));

    const dvpWor3Collection = this.elementosTablaTerceros.map((terceros, index)=>({
      LineId: index + 1,
      U_CardCode: terceros.U_CardCode,
      U_CardName: terceros.U_CardName,
      U_DocNumOC: terceros.U_DocNumOC, 
      U_DocTotal: terceros.U_DocTotal,
      
    }))

    const dvpWor4Collection = this.elementosTablaRecomendaciones.map((recomendacion, index)=>({
      LineId: index + 1,
      U_ItemCode: recomendacion.U_ItemCode,
      U_ItemName: recomendacion.U_ItemName,
      U_Quantity: recomendacion.U_Quantity, 
     
      
    }))
  

    const DVP_WOR5Collection = this.archivos.map((archivo, index) => ({
      LineId: index + 1,
      VisOrder: index,
      Object: null,
      LogInst: null,
      U_Descripcion: archivo.U_Descripcion,
      U_NomFile: archivo.U_NomFile,
      U_TipAnex: archivo.U_TipAnex,
      U_Filebase64: archivo.U_Filebase64, 
      U_absentry: '10'
    }));

    const dvpWor7Collection = this.elementosTabla.slice(0, -1).map((elemento, index) => ({
      LineId: index + 1,
      U_TipEqu: elemento.U_TipEqu,
      U_NumEcon: elemento.U_NumEcon,
      U_NorRep: elemento.U_NReparto,
      U_Marca: elemento.U_GoodsBrand,
      U_Modelo: elemento.U_GoodsModel,
      U_Serie: elemento.U_GoodsSerial,
      U_OdomAct: elemento.U_OdoAct,
      U_OdomNue: elemento.U_OdomNue !== undefined ? elemento.U_OdomNue : this.miFormulario.get('U_OdomNue')?.value,
    }));
  
    const bodyParaAPI = {
      DocEntry: 64,
      DocNum: 64,
      Series: -1,
      U_LastPref: null,
      U_ConFlo: null,
      U_DocNum: valoresFormulario.selectedSeriesInput,
      U_Series: valoresFormulario.selectedSeries,
      U_Prefix: null,
      U_TipTra: valoresFormulario.tipoTrabajo,
      U_RefOrdTra: null,
      U_CardCode: valoresFormulario.U_CardCode,
      U_CardName: valoresFormulario.U_CardName,
      U_Address: valoresFormulario.direccion,
      U_City: valoresFormulario.ciudad,
      U_Phone: valoresFormulario.telefono,
      U_OrdCom: null,
      U_PDFOC: null,
      U_NomSysOC: null,
      U_Status: valoresFormulario.estadoSeleccionado,
      U_DocDate: valoresFormulario.fechaSeleccionada,
      U_FecEspPar: null,
      U_Prior: valoresFormulario.prioridadSeleccionada,
      U_AgVent: valoresFormulario.codigoAgente,
      U_NomAgVent: valoresFormulario.seleccionAgente, // Ajusta según tu lógica
      U_PerAut: valoresFormulario.autorizadoPor,
      U_PerRep: valoresFormulario.reportadoPor,
      U_CodFall: valoresFormulario.selectedFallos,
      U_ProRep: valoresFormulario.U_ProRep,
      U_ComTra: valoresFormulario.textoDiagnostico,
      U_ComRec: null,
      U_ComRef: null,
      U_ComMan: null,
      U_ComRep: null,
      U_Com: null,
      U_ComClosed: null,
      U_TipEqu: null,
      U_NumEcon: null,
      U_Marca: null,
      U_Modelo: null,
      U_Serie: null,
      U_Closed: null,
      U_Ended: null,
      U_Odom: null,
      U_EndRec: null,
      U_StartD: null,
      U_EndD: null,
      U_HasD: null,
      U_HorasMan: null,
      U_StartC: null,
      U_EndC: null,
      U_HasC: null,
      U_StartA: null,
      U_EndA: null,
      U_HasA: null,
      U_StartP: null,
      U_EndP: null,
      U_HasP: null,
      U_StartE: null,
      U_EndE: null,
      U_HasE: null,
      U_DocT: null,
      U_DocR: null,
      U_DocCot: null,
      U_DocFac: null,
      U_EnTras: null,
      U_FueSer: null,
      U_NorRep: null,
      U_TecResp: valoresFormulario.seleccionTecnico,
      U_Coord: valoresFormulario.seleccionCoordinador,
      U_ManObrCap: null,
      DVP_WOR1Collection: detallesCotizacionesParaAPI1,
     // DVP_WOR1Collection:elementos,
     // DVP_WOR2Collection: null,
      DVP_WOR2Collection: dvpWor2Collection,
      DVP_WOR3Collection: dvpWor3Collection,
      DVP_WOR4Collection: dvpWor4Collection,
      DVP_WOR5Collection: DVP_WOR5Collection,
      DVP_WOR6Collection: null,
      DVP_WOR7Collection: dvpWor7Collection,
     
    };

    console.log('Valores mandados al api', bodyParaAPI);
    // Llama al servicio para guardar los datos en el API
    const jsonBody = JSON.stringify(bodyParaAPI);
  console.log(jsonBody)
  
    if (this.miFormulario.valid) {
      // Mostrar SweetAlert con la pregunta
      Swal.fire({
        //title: '¿Está seguro que desea grabar estos datos?',
        text: '¿Está seguro de grabar esta orden ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.grabandoDatos = true;
          // Usuario hizo clic en "Sí, grabar", llama al servicio para enviar los datos
          this.creacionOrdenesService.grabarOrdenTrabajo(bodyParaAPI).subscribe(
            (respuesta) => {
              // Manejar la respuesta del servicio según sea necesario
              console.log('Respuesta del servicio:', respuesta);
              this.grabandoDatos = false;
              Swal.fire({
                title: 'Éxito',
                text: 'OT Grabado con Éxito',
                icon: 'success'
              });
            },
            (error) => {
              // Manejar errores si es necesario
              console.error('Error en la petición:', error);
              this.grabandoDatos = false;
              Swal.fire({
                title: 'Error',
                text: 'Error al llamar al API',
                icon: 'error'
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Usuario hizo clic en "Cancelar"
          Swal.fire('Cancelado', 'No se han grabado los datos', 'info');
        }
      });
    } else {
      // El formulario no es válido, muestra un mensaje con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar los campos del formulario',
      });
    }
  }
  


  onSubmit(): void {
    if (this.modoEdicion) {
      this.actualizarOrden();
    } else {
      this.grabarOrden();
    }
  }


  actualizarOrden1() {
    if (this.docEntry !== null) {

    const valoresFormulario = this.miFormulario.value;
    console.log('Datos del formulario por propoedades' ,valoresFormulario)
    /*
    //console.log('Valores enviados para edicion', valoresFormulario)
    const tipoEquipoNombre = this.elementosTabla[0]?.U_TipEqu || '';
    console.log(tipoEquipoNombre)

*/
    const tipoEquipoSeleccionado = this.miFormulario.get('U_TipEqu')?.value;
    const tipoEquipoNombre = tipoEquipoSeleccionado ? tipoEquipoSeleccionado.Code : '';
   console.log('nombre del equipo', tipoEquipoNombre)

   const uNorRepValue = this.selectedU_NReparto;

   const detallesCotizacionesParaAPI = this.dDetallesCotizaciones.map((detalle, index) => ({
    //LineId: null,
    LineId: index + 1,
    U_ItemCode: detalle.ItemCode,
    U_ItemName: detalle.Dscription,
    U_Quantity: detalle.Quantity,
    U_CarCli: "Y", // Supongo que estos valores son fijos, ajusta según tus necesidades
    U_CarEmp: "N",
    U_InCot: null,
    U_Ins: null,
    U_StaAlm: null,
    U_DocEnt: null,
    U_DocSal: null,
    U_LinDocSal: null,
    U_AlmEnt: "08", // Ajusta según tus necesidades
    U_AlmSal: null,
   // U_CotVen: 4534,
    U_CotVen: detalle.DocEntry,// Ajusta según tus necesidades
    U_LinCot: null,
    U_OrdVen: null,
    U_LinOrdVen: null,
    U_StaSol: null,
    U_OrdCom: null,
    U_LinOrdCom: null,
    U_TipDocSal: null,
    U_Factura: null,
    U_LinFactura: null,
    U_Entregado: null,
    U_InvIt: null,
    U_EsSer: null,
    U_CodTec: null,
    U_NomTec: null,
    U_FecSer: null,
    U_End: null,
    U_HorSer: 0.0,
    U_HorSerR: 0.0,
    //U_Existencia: 0.0,
    U_Existencia: this.elementosTablaRefacciones[index +1]?.Existencia || '',
    //U_Existencia: detalle.Existencia !== undefined ? detalle.Existencia : 0, // Se usa un valor por defecto (0) si Existencia es undefined
    //U_NorRep: uNorRepValue,
     U_NorRep: detalle.U_NorRep, // Ajusta según tus necesidades
  }));


  /*
    const detallesCotizacionesParaAPI1 = this.dDetallesCotizaciones.map((detalle, index) => {
      const valoresUExistencia = this.elementosTablaRefacciones[index+1]?.Existencia || '';
      
      return {
          LineId: index + 1,
          U_ItemCode: detalle.ItemCode,
          U_ItemName: detalle.Dscription,
          U_Quantity: detalle.Quantity,
          U_CarCli: "Y",
          U_CarEmp: "N",
          U_AlmEnt: "08",
          U_InCot: null,
          U_Ins: null,
          U_StaAlm: null,
          U_DocEnt: null,
          U_DocSal: null,
          U_LinDocSal: null,
          U_CotVen: detalle.DocEntry,
          U_Existencia: valoresUExistencia,
          U_NorRep: uNorRepValue,

          U_AlmSal: null,
          // U_CotVen: 4534,
           
           U_LinCot: null,
           U_OrdVen: null,
           U_LinOrdVen: null,
           U_StaSol: null,
           U_OrdCom: null,
           U_LinOrdCom: null,
           U_TipDocSal: null,
           U_Factura: null,
           U_LinFactura: null,
           U_Entregado: null,
           U_InvIt: null,
           U_EsSer: null,
           U_CodTec: null,
           U_NomTec: null,
           U_FecSer: null,
           U_End: null,
           U_HorSer: 0.0,
           U_HorSerR: 0.0,
           //U_Existencia: 0.0,
         
      };
  });*/

  const elementosFiltrados = this.elementosTablaManoDeObra.filter((manoDeObra, index) => index !== 0 && manoDeObra.Articulo !== '');
  const fecha = this.fechaSeleccionadatablas || new Date();;

  const dvpWor2Collection = elementosFiltrados.map((nuevaManoDeObra, index) => ({
    LineId: index + 1,
    U_ItemCode: nuevaManoDeObra.U_ItemCode,
    U_ItemName: nuevaManoDeObra.U_ItemName,
    U_CodTec: this.codigoTecnicoSeleccionado, 
    U_NomTec: this.nombreTecnicoSeleccionado,
    U_FecSer: fecha,
    U_End: nuevaManoDeObra.U_End ? 'S' : 'N',
    U_HorSer: nuevaManoDeObra.U_HorSer, 
    U_HorSerR: nuevaManoDeObra.U_HorSerR, 
    U_Quantity: nuevaManoDeObra.U_Quantity,
}));

/*
const archivosParaAPI = this.archivos.map(archivo => ({
  LineId: null, // Ajusta según sea necesario
  VisOrder: 0, // Ajusta según sea necesario
  Object: null, // Ajusta según sea necesario
  LogInst: null, // Ajusta según sea necesario
  U_Descripcion: archivo.descripcion || '', // Ajusta según sea necesario
  U_File: null, // Ajusta según sea necesario
  U_NomFile: archivo.name || '', // Ajusta según sea necesario
  U_NomSys: null, // Ajusta según sea necesario
  U_TipAnex: archivo.tipo || '', // Ajusta según sea necesario
  U_Filebase64: '' // Ajusta según sea necesario
}));*/




const DVP_WOR5Collection = this.archivos.map((archivo, index) => ({
 // LineId: null,
  LineId: index + 1,
  VisOrder: index,
  Object: null,
  LogInst: null,
  U_Descripcion: archivo.U_Descripcion,
  U_File: null, // Ajusta según sea necesario, no parece estar en uso en tu ejemplo
  U_NomFile: archivo.U_NomFile,
  U_NomSys: null, // Ajusta según sea necesario
  U_TipAnex: archivo.U_TipAnex,
  U_Filebase64: archivo.U_Filebase64 
  
}));




    const filasNoVacias = this.elementosTabla.filter(fila => fila.U_TipEqu !== null);
        
    // Mapear las filas no vacías al formato esperado para DVP_WOR7Collection
    const dvpWor7Collection = filasNoVacias.map((fila, index) => ({
        LineId: index + 1, // Asegura que LineId sea único
        U_TipEqu: fila.U_TipEqu,
        U_NumEcon: fila.U_NumEcon,
        U_NorRep: fila.U_NReparto,
        U_Marca: fila.U_GoodsBrand,
        U_Modelo: fila.U_GoodsModel,
        U_Serie: fila.U_GoodsSerial,
        U_OdomAct: fila.U_OdoAct,
        U_OdomNue: fila.U_OdomNue !== undefined ? fila.U_OdomNue : null,
    }));
    
    const bodyParaActualizacion = {
      DocEntry: this.docEntry,
      DocNum: this.docEntry,
      Series: -1,
      U_LastPref: null,
      U_ConFlo: null,
      U_DocNum: valoresFormulario.selectedSeriesInput,
      U_Series: valoresFormulario.selectedSeries,
      U_Prefix: null,
      U_TipTra: valoresFormulario.tipoTrabajo,
      U_RefOrdTra: null,
      U_CardCode: valoresFormulario.U_CardCode,
      U_CardName: valoresFormulario.U_CardName,
      U_Address: valoresFormulario.direccion,
      U_City: valoresFormulario.ciudad,
      U_Phone: valoresFormulario.telefono,
      U_OrdCom: null,
      U_PDFOC: null,
      U_NomSysOC: null,
      U_Status: valoresFormulario.estadoSeleccionado,
      U_DocDate: valoresFormulario.fechaSeleccionada,
      U_FecEspPar: null,
      U_Prior: valoresFormulario.prioridadSeleccionada,
      U_NomAgVent: valoresFormulario.seleccionAgente, 
      U_AgVent: valoresFormulario.codigoAgente,
     // Ajusta según tu lógica
      U_PerAut: valoresFormulario.autorizadoPor,
      U_PerRep: valoresFormulario.reportadoPor,
      U_CodFall: valoresFormulario.selectedFallos,
      U_ProRep: valoresFormulario.U_ProRep,
      U_ComTra: valoresFormulario.textoDiagnostico,
      U_ComRec: null,
      U_ComRef: null,
      U_ComMan: null,
      U_ComRep: null,
      U_Com: null,
      U_ComClosed: null,
      U_TipEqu: null,
      U_NumEcon: null,
      U_Marca: null,
      U_Modelo: null,
      U_Serie: null,
      U_Closed: null,
      U_Ended: null,
      U_Odom: null,
      U_EndRec: null,
      U_StartD: null,
      U_EndD: null,
      U_HasD: null,
      U_HorasMan: null,
      U_StartC: null,
      U_EndC: null,
      U_HasC: null,
      U_StartA: null,
      U_EndA: null,
      U_HasA: null,
      U_StartP: null,
      U_EndP: null,
      U_HasP: null,
      U_StartE: null,
      U_EndE: null,
      U_HasE: null,
      U_DocT: null,
      U_DocR: null,
      U_DocCot: null,
      U_DocFac: null,
      U_EnTras: null,
      U_FueSer: null,
      U_NorRep: null,
      U_TecResp: valoresFormulario.seleccionTecnico,
      U_Coord: valoresFormulario.seleccionCoordinador,
      U_ManObrCap: null,
      DVP_WOR1Collection: detallesCotizacionesParaAPI,
      DVP_WOR2Collection: dvpWor2Collection,
      DVP_WOR3Collection: null,
      DVP_WOR4Collection: null,
      DVP_WOR5Collection: DVP_WOR5Collection,
      DVP_WOR6Collection: null,
      DVP_WOR7Collection: dvpWor7Collection,
     
     /* DVP_WOR7Collection: []= [{
        LineId: 1, // Asegura que LineId sea único
       
        U_TipEqu:tipoEquipoNombre,
        U_NumEcon: this.elementosTabla[0].U_NumEcon,
        U_NorRep: this.elementosTabla[0].U_NReparto,
        U_Marca: this.elementosTabla[0].U_GoodsBrand,
        U_Modelo: this.elementosTabla[0].U_GoodsModel,
        U_Serie: this.elementosTabla[0].U_GoodsSerial,
        U_OdomAct: this.elementosTabla[0].U_OdoAct,
        U_OdomNue: this.elementosTabla[0].U_OdomNue !== undefined ? this.elementosTabla[0].U_OdomNue : this.miFormulario.get('U_OdomNue')?.value,

        
      }],*/
    };
    

    console.log('body para actualizacion', bodyParaActualizacion)
    const jsonBody = JSON.stringify(bodyParaActualizacion);
    console.log(jsonBody)
    // Llama al servicio para actualizar la orden
    this.creacionOrdenesService.updateOrden(bodyParaActualizacion).subscribe(
      response => {
        console.log('Respuesta del API al actualizar la orden', response);
        
        // Puedes mostrar un mensaje de éxito si lo deseas
        Swal.fire({
          title: "Exito",
          text: "OT actualizado con Exito",
          icon: "success"
        });
        
      },
      error => {
        console.error('Error al actualizar la orden', error);
        // Puedes manejar el error según tus necesidades
      }
    );
    
  }else {
    console.error('No se pudo obtener un valor válido de DocEntry');
    // Puedes manejar el caso en el que no se pueda obtener DocEntry
  }
}



actualizarOrden() {
  if (this.docEntry !== null) {
    const valoresFormulario = this.miFormulario.value;
    const tipoEquipoSeleccionado = this.miFormulario.get('U_TipEqu')?.value;
    const tipoEquipoNombre = tipoEquipoSeleccionado ? tipoEquipoSeleccionado.Code : '';
    const uNorRepValue = this.selectedU_NReparto;

    const detallesCotizacionesParaAPI = this.dDetallesCotizaciones.map((detalle, index) => ({
      LineId: index + 1,
      U_ItemCode: detalle.ItemCode,
      U_ItemName: detalle.Dscription,
      U_Quantity: detalle.Quantity,
      U_CarCli: "Y",
      U_CarEmp: "N",
      U_AlmEnt: "08",
      U_CotVen: detalle.DocEntry,
      U_Existencia: this.elementosTablaRefacciones[index +1]?.Existencia || '',
      U_NorRep: uNorRepValue,
    }));

    const detallesCotizacionesParaAPI1 = this.elementosTablaRefacciones.map((detalle, index) => ({
      //LineId: null,
      LineId: index + 1,
      U_ItemCode: detalle.U_ItemCode,
      U_ItemName: detalle.U_ItemName,
      U_Quantity: detalle.U_Quantity,
      U_CarCli: "Y", // Supongo que estos valores son fijos, ajusta según tus necesidades
      U_CarEmp: "N",
      U_InCot: null,
      U_Ins: null,
      U_StaAlm: null,
      U_DocEnt: null,
      U_DocSal: null,
      U_LinDocSal: null,
      U_AlmEnt: detalle.Almacen, // Ajusta según tus necesidades
      U_AlmSal: null,
     // U_CotVen: 4534,
      U_CotVen: detalle.DocEntry,// Ajusta según tus necesidades
      U_LinCot: null,
      U_OrdVen: null,
      U_LinOrdVen: null,
      U_StaSol: null,
      U_OrdCom: null,
      U_LinOrdCom: null,
      U_TipDocSal: null,
      U_Factura: null,
      U_LinFactura: null,
      U_Entregado: null,
      U_InvIt: null,
      U_EsSer: null,
      U_CodTec: null,
      U_NomTec: null,
      U_FecSer: null,
      U_End: null,
      U_HorSer: 0.0,
      U_HorSerR: 0.0,
      U_Existencia: detalle.U_Existencia,
      U_NorRep: detalle.U_NorRep, // Ajusta según tus necesidades
    }));

    const elementosFiltrados = this.elementosTablaManoDeObra.filter((manoDeObra, index) => index !== 0 && manoDeObra.Articulo !== '');
    const fecha = this.fechaSeleccionadatablas || new Date();;

    const dvpWor2Collection = elementosFiltrados.map((nuevaManoDeObra, index) => ({
      LineId: index + 1,
      U_ItemCode: nuevaManoDeObra.U_ItemCode,
      U_ItemName: nuevaManoDeObra.U_ItemName,
      U_CodTec: this.codigoTecnicoSeleccionado, 
      U_NomTec: this.nombreTecnicoSeleccionado,
      U_FecSer: fecha,
      U_End: nuevaManoDeObra.U_End ? 'S' : 'N',
      U_HorSer: nuevaManoDeObra.U_HorSer, 
      U_HorSerR: nuevaManoDeObra.U_HorSerR, 
      U_Quantity: nuevaManoDeObra.U_Quantity,
    }));

    const dvpWor3Collection = this.elementosTablaTerceros.map((terceros, index)=>({
      LineId: index + 1,
      U_CardCode: terceros.U_CardCode,
      U_CardName: terceros.U_CardName,
      U_DocNumOC: terceros.U_DocNumOC, 
      U_DocTotal: terceros.U_DocTotal,
      
    }))



    const dvpWor4Collection = this.elementosTablaRecomendaciones.map((recomendacion, index)=>({
      LineId: index + 1,
      U_ItemCode: recomendacion.U_ItemCode,
      U_ItemName: recomendacion.U_ItemName,
      U_Quantity: recomendacion.U_Quantity, 
     
      
    }))
  


    const DVP_WOR5Collection = this.archivos.map((archivo, index) => ({
      LineId: index + 1,
      VisOrder: index,
      Object: null,
      LogInst: null,
      U_Descripcion: archivo.U_Descripcion,
      U_NomFile: archivo.U_NomFile,
      U_TipAnex: archivo.U_TipAnex,
      U_Filebase64: archivo.U_Filebase64,
      U_absentry: '10'
    }));

    const filasNoVacias = this.elementosTabla.filter(fila => fila.U_TipEqu !== null);
    const dvpWor7Collection = filasNoVacias.map((fila, index) => ({
      LineId: index + 1,
      U_TipEqu: fila.U_TipEqu,
      U_NumEcon: fila.U_NumEcon,
      U_NorRep: fila.U_NReparto,
      U_Marca: fila.U_GoodsBrand,
      U_Modelo: fila.U_GoodsModel,
      U_Serie: fila.U_GoodsSerial,
      U_OdomAct: fila.U_OdoAct,
      U_OdomNue: fila.U_OdomNue !== undefined ? fila.U_OdomNue : null,
    }));
    
    const bodyParaActualizacion = {
      DocEntry: this.docEntry,
      DocNum: this.docEntry,
      Series: -1,
      U_LastPref: null,
      U_ConFlo: null,
      U_DocNum: valoresFormulario.selectedSeriesInput,
      U_Series: valoresFormulario.selectedSeries,
      U_Prefix: null,
      U_TipTra: valoresFormulario.tipoTrabajo,
      U_RefOrdTra: null,
      U_CardCode: valoresFormulario.cliente,
      U_CardName: valoresFormulario.U_CardName,
      U_Address: valoresFormulario.direccion,
      U_City: valoresFormulario.ciudad,
      U_Phone: valoresFormulario.telefono,
      U_OrdCom: null,
      U_PDFOC: null,
      U_NomSysOC: null,
      U_Status: valoresFormulario.estadoSeleccionado,
      U_DocDate: valoresFormulario.fechaSeleccionada,
      U_FecEspPar: null,
      U_Prior: valoresFormulario.prioridadSeleccionada,
      U_NomAgVent: valoresFormulario.seleccionAgente, 
      U_AgVent: valoresFormulario.codigoAgente,
     // Ajusta según tu lógica
      U_PerAut: valoresFormulario.autorizadoPor,
      U_PerRep: valoresFormulario.reportadoPor,
      U_CodFall: valoresFormulario.selectedFallos,
      U_ProRep: valoresFormulario.U_ProRep,
      U_ComTra: valoresFormulario.textoDiagnostico,
      U_ComRec: null,
      U_ComRef: null,
      U_ComMan: null,
      U_ComRep: null,
      U_Com: null,
      U_ComClosed: null,
      U_TipEqu: null,
      U_NumEcon: null,
      U_Marca: null,
      U_Modelo: null,
      U_Serie: null,
      U_Closed: null,
      U_Ended: null,
      U_Odom: null,
      U_EndRec: null,
      U_StartD: null,
      U_EndD: null,
      U_HasD: null,
      U_HorasMan: null,
      U_StartC: null,
      U_EndC: null,
      U_HasC: null,
      U_StartA: null,
      U_EndA: null,
      U_HasA: null,
      U_StartP: null,
      U_EndP: null,
      U_HasP: null,
      U_StartE: null,
      U_EndE: null,
      U_HasE: null,
      U_DocT: null,
      U_DocR: null,
      U_DocCot: null,
      U_DocFac: null,
      U_EnTras: null,
      U_FueSer: null,
      U_NorRep: null,
      U_TecResp: valoresFormulario.seleccionTecnico,
      U_Coord: valoresFormulario.seleccionCoordinador,
      U_ManObrCap: null,
      DVP_WOR1Collection: detallesCotizacionesParaAPI1,
      DVP_WOR2Collection: dvpWor2Collection,
      DVP_WOR3Collection: dvpWor3Collection,
      DVP_WOR4Collection: dvpWor4Collection,
      DVP_WOR5Collection: DVP_WOR5Collection,
      DVP_WOR6Collection: null,
      DVP_WOR7Collection: dvpWor7Collection,
     
     /* DVP_WOR7Collection: []= [{
        LineId: 1, // Asegura que LineId sea único
       
        U_TipEqu:tipoEquipoNombre,
        U_NumEcon: this.elementosTabla[0].U_NumEcon,
        U_NorRep: this.elementosTabla[0].U_NReparto,
        U_Marca: this.elementosTabla[0].U_GoodsBrand,
        U_Modelo: this.elementosTabla[0].U_GoodsModel,
        U_Serie: this.elementosTabla[0].U_GoodsSerial,
        U_OdomAct: this.elementosTabla[0].U_OdoAct,
        U_OdomNue: this.elementosTabla[0].U_OdomNue !== undefined ? this.elementosTabla[0].U_OdomNue : this.miFormulario.get('U_OdomNue')?.value,

        
      }],*/
    };
    

    console.log('body para actualizacion', bodyParaActualizacion)
    const jsonBody = JSON.stringify(bodyParaActualizacion);
    console.log(jsonBody)

   

    // Mostrar SweetAlert con la pregunta antes de actualizar la orden
    Swal.fire({
     // title: '¿Desea actualizar esta orden?',
      text: '¿Está seguro que desea actualizar esta orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grabandoDatos = true;
        // Usuario confirmó la actualización, llamar al servicio para actualizar la orden
        this.creacionOrdenesService.updateOrden(bodyParaActualizacion).subscribe(
          response => {
            console.log('Respuesta del API al actualizar la orden', response);
            this.grabandoDatos = false;
            // Mostrar mensaje de éxito
            Swal.fire({
              title: 'Éxito',
              text: 'OT actualizada con éxito',
              icon: 'success'
            });
          },
          error => {
            console.error('Error al actualizar la orden', error);
            this.grabandoDatos = false;
            // Mostrar mensaje de error
            Swal.fire({
              title: 'Error',
              text: 'Error al actualizar la orden',
              icon: 'error'
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Usuario canceló la actualización, mostrar mensaje informativo
        Swal.fire('Cancelado', 'La orden no se ha actualizado', 'info');
      }
    });
  } else {
    console.error('No se pudo obtener un valor válido de DocEntry');
    // Puedes manejar el caso en el que no se pueda obtener DocEntry
  }
}





  
/*
onFileSelected(event: any) {
  const selectedFile = event.target.files[0]; // Obtener el archivo seleccionado

  // Verificar si se seleccionó un archivo
  if (selectedFile) {
    const nuevoArchivo = {
      name: selectedFile.name,
      tipo: selectedFile.type,
      descripcion: '' // Puedes agregar más campos según sea necesario
    };

    this.archivos.push(nuevoArchivo); // Agregar el archivo a la lista de archivos
    console.log(this.archivos)
  }
}*/



onFileSelected(event: any) {
  const selectedFiles: FileList = event.target.files; // Obtener la lista de archivos seleccionados

  // Verificar si se seleccionó al menos un archivo
  if (selectedFiles && selectedFiles.length > 0) {
      // Iterar sobre los archivos seleccionados
      for (let i = 0; i < selectedFiles.length; i++) {
          const selectedFile: File = selectedFiles[i]; // Obtener cada archivo individualmente

          // Crear un objeto para el archivo
          const nuevoArchivo = {
            U_NomFile: selectedFile.name,
            U_TipAnex: selectedFile.type,
            U_Descripcion: '',
            U_Filebase64: ''
          };

          // Agregar el archivo a la lista de archivos
          this.archivos.push(nuevoArchivo);

          // Crear un objeto de FileReader para leer el contenido del archivo como URL de datos
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile); // Leer el contenido del archivo como URL de datos

          // Manejar el evento de carga del archivo
          reader.onload = () => {
              // Obtener el contenido en Base64
              const base64String = reader.result as string;

              // Asignar el contenido en Base64 a la propiedad U_Filebase64 del archivo
              nuevoArchivo.U_Filebase64 = base64String.split(',')[1]; // Eliminar el prefijo "data:application/pdf;base64," antes del contenido Base64
          };
      }

      console.log(this.archivos); // Verifica la lista de archivos en la consola
  }
}


  /*
  onSubmit() {
    if (this.isSubmitting) {
      return;
    }
  
    this.isSubmitting = true;
  
    const valoresFormulario = this.miFormulario.value;
    console.log('Valores del formulario', valoresFormulario);
  
    const bodyParaAPI = {
      DocEntry: 64,
      DocNum: 64,
      Series: -1,
      U_LastPref: null,
      U_ConFlo: null,
      U_DocNum: valoresFormulario.selectedSeriesInput,
      U_Series: valoresFormulario.selectedSeries,
      U_Prefix: null,
      U_TipTra: valoresFormulario.tipoTrabajo,
      U_RefOrdTra: null,
      U_CardCode: valoresFormulario.cliente,
      U_CardName: valoresFormulario.nombre,
      U_Address: valoresFormulario.direccion,
      U_City: valoresFormulario.ciudad,
      U_Phone: valoresFormulario.telefono,
      U_OrdCom: null,
      U_PDFOC: null,
      U_NomSysOC: null,
      U_Status: valoresFormulario.estadoSeleccionado,
      U_DocDate: valoresFormulario.fechaSeleccionada.toISOString(),
      U_FecEspPar: null,
      U_Prior: valoresFormulario.prioridadSeleccionada,
      U_AgVent: valoresFormulario.seleccionAgente,
      U_NomAgVent: null, // Ajusta según tu lógica
      U_PerAut: valoresFormulario.autorizadoPor,
      U_PerRep: valoresFormulario.reportadoPor,
      U_CodFall: valoresFormulario.selectedFallos,
      U_ProRep: valoresFormulario.U_ProRep,
      U_ComTra: null,
      U_ComRec: null,
      U_ComRef: null,
      U_ComMan: null,
      U_ComRep: null,
      U_Com: null,
      U_ComClosed: null,
      U_TipEqu: null,
      U_NumEcon: null,
      U_Marca: null,
      U_Modelo: null,
      U_Serie: null,
      U_Closed: null,
      U_Ended: null,
      U_Odom: null,
      U_EndRec: null,
      U_StartD: null,
      U_EndD: null,
      U_HasD: null,
      U_HorasMan: null,
      U_StartC: null,
      U_EndC: null,
      U_HasC: null,
      U_StartA: null,
      U_EndA: null,
      U_HasA: null,
      U_StartP: null,
      U_EndP: null,
      U_HasP: null,
      U_StartE: null,
      U_EndE: null,
      U_HasE: null,
      U_DocT: null,
      U_DocR: null,
      U_DocCot: null,
      U_DocFac: null,
      U_EnTras: null,
      U_FueSer: null,
      U_NorRep: null,
      U_TecResp: valoresFormulario.seleccionTecnico,
      U_Coord: valoresFormulario.seleccionCoordinador,
      U_ManObrCap: null,
      DVP_WOR1Collection: null,
      DVP_WOR2Collection: null,
      DVP_WOR3Collection: null,
      DVP_WOR4Collection: null,
      DVP_WOR5Collection: null,
      DVP_WOR6Collection: null,
      DVP_WOR7Collection: [
        {
          LineId: 1,
          U_TipEqu: "MC01",
          U_NumEcon: "bds8888",
          U_NorRep: "jhgh555",
          U_Marca: "BOSH",
          U_Modelo: "BSH547",
          U_Serie: "557896",
          U_OdomAct: 21,
          U_OdomNue: 22
        }
      ]
    };
  
    console.log('Valores mandados al API', bodyParaAPI);
  
    this.creacionOrdenesService.grabarOrdenTrabajo(bodyParaAPI)
      .pipe(
        exhaustMap(response => {
          console.log('Respuesta del API', response);
          Swal.fire({
            title: "Éxito",
            text: "OT Grabado con Éxito",
            icon: "success"
          });
          // Puedes retornar un observable vacío o con algún valor si es necesario
          return of(null);
        }),
        catchError(error => {
          console.error('Error al llamar al API', error);
          Swal.fire({
            title: "Error",
            text: "Error al llamar al API",
            icon: "error"
          });
          // Puedes retornar un observable vacío o con algún valor si es necesario
          return throwError(error);
        }),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe();
  }*/



  

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

  cargarDatosAgenteVentas(){
    this.creacionOrdenesService.traerAgenteVentas().subscribe(
      (response)=>{
        if(response.ResultCode === 0 && response.data){
          this.agenteVentas = response.data;
          console.log( 'Datos de Agente de ventas',response.data)
        }
      }
    )
  }

  cargarDatosAdicionalesMC01(tipo:any, codigo:any){
  this.creacionOrdenesService.datosMC01(codigo,tipo).subscribe(
    (response)=> {
      if(response.ResultCode === 0 && response.data){
        
        this.dAdicionales = response.data[0];
        this.miFormulario.get('U_CardCode')?.setValue(this.dAdicionales.CardCode);
        this.miFormulario.get('U_CardName')?.setValue(this.dAdicionales.CardName);
        this.miFormulario.get('direccion')?.setValue(this.dAdicionales.Street);
        this.miFormulario.get('ciudad')?.setValue(this.dAdicionales.City);
        this.miFormulario.get('telefono')?.setValue(this.dAdicionales.Phone1);
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
    const cardCode = this.miFormulario.get('U_CardCode')?.value;
    console.log('este es el carnCode',cardCode )
   // const cardNameInput = this.dAdicionales?.CardName || '';
    const cardNameInput = this.miFormulario.get('U_CardName')?.value || '';
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


  cargarDatosCotizaciones(codigo: any) {
    const cardCode = this.miFormulario.get('U_CardCode')?.value || '';
    const cardNameInput = this.miFormulario.get('U_CardName')?.value || '';
  
    console.log(this.cardNameInput1, this.cardcode)
    
    if (!cardCode || !cardNameInput) {
      console.error('CardCode o CardName no definidos.');
      return;
    }
  
    this.creacionOrdenesService.traerCotizaciones(codigo).subscribe(
      (response) => {
        if (response.ResultCode === 0 && response.data) {
          this.dCotizaciones = response.data;
  
          const cotizacionCoincide = this.dCotizaciones.some(cotizacion => cotizacion.CardName === cardNameInput);
  
          if (cotizacionCoincide) {
            this.cotizaciones = true;
            this.cotizacionSeleccionada = this.dCotizaciones.find(cotizacion => cotizacion.CardName === cardNameInput);
          } else {
            this.mostrarError('El CardName no coincide con las cotizaciones.');
          }
        } else {
          this.mostrarError('No se encontraron cotizaciones asociadas.');
        }
      },
      (error) => {
        this.mostrarError('Error de conexión al API.');
      }
    );
  }
  
  mostrarError(mensaje: string) {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
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
      
      this.elementosTablaRefacciones.forEach((orden: any) => {
        orden.Almacen = this.almacenSeleccionado;
        console.log('ghff', orden.Almacen)
      });

    }
  }
  
 
  
/*
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
  }*/

/*
  onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);
    
    // Verifica si se ha seleccionado previamente un tipo de trabajo
    if (this.miFormulario.get('tipoTrabajo')?.value) {

      const tipoSeleccionado = this.listaTrabajos.find(tipo => tipo.Code === event.value);
      
      // Asigna el nombre del tipo de equipo seleccionado en el formulario reactivo
      if (tipoSeleccionado) {
        this.miFormulario.get('U_TipEqu')?.setValue(tipoSeleccionado);
  
        // Resto de tu código...
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
      } else {
        // Manejar el caso cuando no se encuentra el tipo seleccionado
        Swal.fire({
          title: 'Error',
          text: 'No se pudo encontrar el tipo de equipo seleccionado.',
          icon: 'error'
        });
        // Puedes mostrar un mensaje de error o realizar otra acción según tu lógica
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
  }*/
  

  /*
  onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);
  
    if (this.miFormulario.get('tipoTrabajo')?.value) {
      const tipoSeleccionado = this.listaTrabajos.find(tipo => tipo.Code === event.value);
  


      if (tipoSeleccionado) {
      this.miFormulario.get('U_TipEqu')?.setValue(tipoSeleccionado);
      this.tipoTrabajoSeleccionado = event.value;
        this.isBT01Selected = this.tipoTrabajoSeleccionado === 'BT01';
        this.isMC01Selected = this.tipoTrabajoSeleccionado === 'MC01';

         console.log('tipo', this.tipoTrabajoSeleccionado)
        if (this.isBT01Selected) {
          this.visibleBT01Modal = true;
        } else if (this.isMC01Selected) {
          this.visibleMC01Modal = true;
        } else {
          console.error('Error: La opción seleccionada en el segundo p-dropdown no coincide.');
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo encontrar el tipo de equipo seleccionado.',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.',
        icon: 'error'
      });
      console.error('Error: Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.');
    }
  }*/
  
  
  onTipoChange(event: any, index: number) {
    console.log('Tipo changed:', event.value);
  
    if (this.miFormulario.get('tipoTrabajo')?.value) {
      const tipoSeleccionado = this.listaTrabajos.find(tipo => tipo.Code === event.value);
  
      if (tipoSeleccionado) {
        this.miFormulario.get('elementosTabla.' + index + '.U_TipEqu')?.setValue(tipoSeleccionado);
        this.tipoTrabajoSeleccionado = event.value;
        this.isBT01Selected = this.tipoTrabajoSeleccionado === 'BT01';
        this.isMC01Selected = this.tipoTrabajoSeleccionado === 'MC01';
        
  
        console.log('tipo', this.tipoTrabajoSeleccionado);
        if (this.isBT01Selected) {
          this.visibleBT01Modal = true;
        } else if (this.isMC01Selected) {
          this.visibleMC01Modal = true;
        } else {
          console.error('Error: La opción seleccionada en el segundo p-dropdown no coincide.');
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo encontrar el tipo de equipo seleccionado.',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.',
        icon: 'error'
      });
      console.error('Error: Debes seleccionar un tipo de trabajo antes de seleccionar el tipo.');
    }
  }
  

/*
  onRowDoubleClick(event: any, rowData: any, tipo: string, codigo:any) {
    this.cargarDatosAdicionalesMC01(tipo, codigo)
    console.log(tipo,codigo)
  let seleccion= this.miFormulario.value.tipoTrabajo
   if(this.elementosTabla.length>0 && this.elementosTabla[0].tipo !== null ){
      if(seleccion=== 'MP1200' || seleccion==='MP1000'|| seleccion==='MP200'|| seleccion==='MP2000'|| 
      seleccion==='MP2400'|| seleccion==='MP250'|| seleccion==='MP500'|| seleccion==='MP600'){
        this.elementosTabla[this.elementosTabla.length-1]={tipo:1, U_NReparto: rowData.U_NReparto, U_NumEcon:rowData.U_NumEcon,
           U_GoodsBrand:rowData.U_GoodsBrand,
          U_GoodsModel:rowData.U_GoodsModel, U_GoodsSerial:rowData.U_GoodsSerial, U_OdoAct:rowData.U_OdoAct, U_OdomNue:rowData.U_OdomNue}
          this.visibleBT01Modal= false;
         this.visibleMC01Modal=false;
         
        this.elementosTabla.push({tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:'', U_OdomNue:''})
     
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
       U_GoodsModel:rowData.U_GoodsModel, U_GoodsSerial:rowData.U_GoodsSerial, U_OdoAct:rowData.U_OdoAct, U_OdomNue:rowData.U_OdomNue}
       this.visibleBT01Modal= false;
       this.visibleMC01Modal=false;

       this.elementosTabla.push({tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:'', U_OdomNue:''})

      

       this.selectedRowData = rowData;

       this.clienteProp = rowData.U_CliProp;
      
       this.nombreProp = rowData.U_NCliProp;
       //this.direccionProp = rowData.dAdicionales.Street;
      
       this.selectedU_NReparto = rowData.U_NReparto;
   }
  }*/


  
  onRowDoubleClick(event: any, rowData: any, tipo: string, codigo: any) {
    // Cargar datos adicionales según el tipo y código
    this.cargarDatosAdicionalesMC01(tipo, codigo);
    console.log(tipo, codigo);
  
    const seleccion = this.miFormulario.value.tipoTrabajo;
  
    if (this.elementosTabla.length > 0 && this.elementosTabla[0].U_TipEqu !== null) {
      if (this.puedeAgregarEquipo(seleccion)) {
        this.agregarNuevoEquipo(rowData);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se puede agregar más equipos",
          icon: "error"
        });
        this.visibleBT01Modal = false;
        this.visibleMC01Modal = false;
      }
    } else if (this.elementosTabla.length === 1 && this.elementosTabla[0].U_TipEqu === null) {
      this.agregarNuevoEquipo(rowData);
    }
/*
    this.elementosTablaRefacciones.forEach((elemento: any) => {
      elemento.U_NorRep = rowData.U_NReparto;
    });*/
  }
  
  private puedeAgregarEquipo(seleccion: string): boolean {
    const permitidos = ['MP1200', 'MP1000', 'MP200', 'MP2000', 'MP2400', 'MP250', 'MP500', 'MP600'];
    return permitidos.includes(seleccion);
  }
  
  private agregarNuevoEquipo(rowData: any): void {
    this.elementosTabla[this.elementosTabla.length - 1] = {
       //U_TipEqu: 1,
      //U_TipEqu:rowData.U_TipEqu,
      U_TipEqu:this.tipoTrabajoSeleccionado, 
      U_NReparto: rowData.U_NReparto,
      U_NumEcon: rowData.U_NumEcon,
      U_GoodsBrand: rowData.U_GoodsBrand,
      U_GoodsModel: rowData.U_GoodsModel,
      U_GoodsSerial: rowData.U_GoodsSerial,
      U_OdoAct: rowData.U_OdoAct,
      U_OdomNue: rowData.U_OdomNue
    };
    this.visibleBT01Modal = false;
    this.visibleMC01Modal = false;
    this.elementosTabla.push({
      U_TipEqu: null,
      U_NReparto: '',
      U_NumEcon: '',
      U_GoodsBrand: '',
      U_GoodsModel: '',
      U_GoodsSerial: '',
      U_OdoAct: '',
      U_OdomNue: null
    });
  
    this.selectedRowData = rowData;
    this.clienteProp = rowData.U_CliProp;
    this.nombreProp = rowData.U_NCliProp;
    this.selectedU_NReparto = rowData.U_NReparto;


    this.elementosTablaRefacciones.forEach((orden: any) => {
     
      //this.selectedU_NReparto = rowData.U_NReparto;
      orden.U_NorRep = this.selectedU_NReparto;
      console.log(orden.U_NorRep)
    });
  }
  

onrowDobleClickref(orden: any) {
  // Verifica si la opción "Cotización" está seleccionada en el dropdown de estados
  if (this.miFormulario.get('estadoSeleccionado')?.value === 'C') {
    // Resto de tu lógica...
    console.log('Datos de la fila seleccionada:', orden);

    // Verifica si SerieAlmacen tiene al menos un elemento
    if (this.SerieAlmacen.length > 0) {
      if (this.selectedU_NReparto) {
        
        const coincideConAlgunAlmacen = this.SerieAlmacen.some(almacen => 
          orden.WhsName === almacen.WhsName || orden.WhsCode === almacen.WhsCode
        );

        if (coincideConAlgunAlmacen) {
          // Crea una nueva fila con los datos de la orden seleccionada
          const nuevaFila = {
            U_ItemCode: orden.ItemCode,
            U_ItemName: orden.ItemName,
            U_Quantity: '',
            CC: '',
            SC: '',
            U_NorRep: this.selectedU_NReparto,
            Almacen: orden.Almacen,
            U_Existencia: '',
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
      
      }
       else {
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
                    U_ItemCode: detalle.ItemCode,
                    U_ItemName: detalle.Dscription,
                    U_Quantity: detalle.Quantity,
                    CC: 'CC',
                    SC: '',
                    U_NorRep: this.selectedU_NReparto,
                    Almacen: cotizacion.Almacen,
                    U_Existencia: '',
                    //Existencia: detalle.stocktotal,
                    original: false,
                    cotizacionAsociada: true,
                  };

                  // Agregar la nueva fila a la tabla
                  this.elementosTablaRefacciones.push(nuevaFila);
                  this.elementosTablaRefacciones = [...this.elementosTablaRefacciones];
                  console.log(this.elementosTablaRefacciones)
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
      U_ItemCode: mano.ItemCode,
      U_ItemName: mano.ItemName,
      U_HorSer: mano.stocktotal,
      U_Quantity: null,
      U_CodTec: '',   
      U_NomTec: '',    
      U_FecSer: '',   
      U_HorSerR: '', 
      U_End: '',
    
    };
  
    this.elementosTablaManoDeObra.push(nuevaManoDeObra);
  
    this.ultimaPosicionCreada = this.elementosTablaManoDeObra.length - 1;
  
    //this.manoDeObra = false
    this.elementosTablaManoDeObra = [...this.elementosTablaManoDeObra];
    // Limpia el formulario si es necesario
    //this.miFormulario.reset();
  
  this.manoDeObra = false
}



onrowDobloClickTecnico(manoTecnicos: any) {
  // Verifica si hay una posición creada
  if (this.ultimaPosicionCreada !== -1) {
    // Actualiza las propiedades "Técnico" y "Nombre" en la última posición de nuevaManoDeObra
    this.elementosTablaManoDeObra[this.ultimaPosicionCreada].U_CodTec = manoTecnicos.Code;
    this.elementosTablaManoDeObra[this.ultimaPosicionCreada].U_NomTec = manoTecnicos.Name;


    this.codigoTecnicoSeleccionado = manoTecnicos.Code;
        this.nombreTecnicoSeleccionado = manoTecnicos.Name;
  } else {  
    // Si nuevaManoDeObra no está creada, muestra un mensaje o realiza alguna acción necesaria
    Swal.fire({
      title: 'Error',
      text: 'Nose ha seleccionado ningun estado para mano de obra.',
      icon: 'error'
    });
    console.error("Error: nuevaManoDeObra no está creada");
  }

  this.manoDeObraTecnicos = false;
}

/*
onrowDobloClickTecnico(manoTecnicos: any, index: number) {
  if (index >= 0 && index < this.elementosTablaManoDeObra.length) {
      this.elementosTablaManoDeObra[index].Tecnico = manoTecnicos.Code;
      this.elementosTablaManoDeObra[index].Nombre = manoTecnicos.Name;

      this.tecnicosSeleccionados[index] = {
          codigo: manoTecnicos.Code,
          nombre: manoTecnicos.Name
      };

      
  } else {
      Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar la fila seleccionada. Índice de fila inválido.',
          icon: 'error'
      });
      console.error('Error: Índice de fila inválido en onrowDobloClickTecnico');
  }
  this.manoDeObraTecnicos = false;
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
      U_CardCode: proveedor.CardCode,
      U_CardName: proveedor.CardName,
      U_DocNumOC: '',
      U_DocTotal: ''
    };
  
    this.elementosTablaTerceros.push(nuevaProveedores);
    this.ultimaPosicionCreada = this.elementosTablaTerceros.length - 1;
    
    this.elementosTablaTerceros = [...this.elementosTablaTerceros];
    // Limpia el formulario si es necesario
    //this.miFormulario.reset();
  
  this.terceros = false;
}


onrowDobloClickOrdenCompraProveedor(ordenCompra: any) {
  // Verifica si hay una posición creada
  if (this.ultimaPosicionCreada !== -1) {
    this.elementosTablaTerceros[this.ultimaPosicionCreada].U_DocNumOC = ordenCompra.DocNum;
    this.elementosTablaTerceros[this.ultimaPosicionCreada].U_DocTotal = ordenCompra.DocTotal;
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


/*
onrowDobloClickREcomendaciones(recomendacion: any) {
  
 
    const nuevaRecomendacion = {
      NoParte: recomendacion.ItemCode,
      Descripcion: recomendacion.ItemName,
      Cantidad: recomendacion.stocktotal,
      
      
    };

  
    this.elementosTablaRecomendaciones.push(nuevaRecomendacion);
   console.log(nuevaRecomendacion)
   
    this.elementosTablaRecomendaciones = [...this.elementosTablaRecomendaciones];
    console.log(this.elementosTablaRecomendaciones)
    // Limpia el formulario si es necesario
    
    this.miFormulario.reset();
  
    
  
  this.recomendaciones = false
}*/



onrowDobloClickREcomendaciones(recomendacion: any) {
  const nuevaRecomendacion = {
    U_ItemCode: recomendacion.ItemCode,
    U_ItemName: recomendacion.ItemName,
    U_Quantity: null,
    //U_Quantity: recomendacion.stocktotal,
  };

  this.elementosTablaRecomendaciones.push(nuevaRecomendacion);
  console.log(nuevaRecomendacion);

  this.elementosTablaRecomendaciones = [...this.elementosTablaRecomendaciones];
  console.log(this.elementosTablaRecomendaciones);

  // Limpia el formulario si es necesario
 // this.miFormulario.reset();

  this.recomendaciones = false;
}



seleccionarAgente(nombreAgente: string) {
  this.miFormulario.get('seleccionAgente')?.setValue(nombreAgente); // Ajusta esto según tu estructura
  console.log(nombreAgente)
  this.agente = false; // Oculta el modal
}


seleccionarAgente1(agenteSeleccionado: any) {
  this.miFormulario.get('seleccionAgente')?.setValue(agenteSeleccionado.SlpName);
  console.log(agenteSeleccionado.SlpName)
  this.miFormulario.get('codigoAgente')?.setValue(agenteSeleccionado.SlpCode);
  console.log(agenteSeleccionado.SlpCode)
  this.agente = false; // Oculta el modal
}

onrowDobloClickREcomendaciones1(recomendacion: any) {
const nuevaRecomendacion = [ 
  this.miFormulario.get('NoParte')?.setValue(recomendacion.ItemCode),
   recomendacion.ItemName,
  this.miFormulario.get('Cantidad')?.setValue(recomendacion.stocktotal),
];

 this.miFormulario.get('NoParte')?.setValue(recomendacion.ItemCode),
  recomendacion.ItemName,
this.miFormulario.get('Cantidad')?.setValue(recomendacion.stocktotal),
  this.elementosTablaRecomendaciones.push(nuevaRecomendacion);
  console.log(nuevaRecomendacion)
  this.elementosTablaRecomendaciones = [...this.elementosTablaRecomendaciones];

  //this.miFormulario.reset();
  this.recomendaciones = false;
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

onEliminarFilaAnexo(elemento: any) {
  
  if (elemento) {
    const indice = this.archivos.indexOf(elemento);
    
    if (indice !== -1) {
      this.archivos.splice(indice, 1);
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

 agenteV(){
  this.agente = true
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
/*
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
    
  }*/


  private actualizarIndiceActivo() {
    let estadoSeleccionado = this.miFormulario.value.estadoSeleccionado;

    if (estadoSeleccionado === 'D') {
        this.diagnosticoHabilitado = true;
        this.refaccionesHabilitado = false;
        this.manoDeObraHabilitado = false;
        this.tercerosHabilitado = false;
        this.recomendacionesHbilitado = false;
        this.anexosHabilitado = false;
       // this.panelActivo = 'diagnosticoPanel';
    } else {
        this.diagnosticoHabilitado = true;
        this.refaccionesHabilitado = true;
        this.manoDeObraHabilitado = true;
        this.tercerosHabilitado = true;
        this.recomendacionesHbilitado = true;
        this.anexosHabilitado = true;
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
  
    
if(estadoSeleccionado === 'D'){
  this.tabIndex = 0; // Índice del panel "Diagnóstico Real"
  
  this.diagnosticoHabilitado = true;
  this.refaccionesHabilitado = false;
  this.manoDeObraHabilitado = false;
  this.tercerosHabilitado = false;
  this.recomendacionesHbilitado = false;
  this.anexosHabilitado = false;
}else{
  this.tabIndex = 1;
  
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
  this.agente = false
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

cojone(){
  console.log('cojone')
}

}
