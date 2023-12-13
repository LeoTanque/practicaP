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
  globalFilter: string = '';
@ViewChild('dt') dt!: Table;

@ViewChild('dt') mc01Table!: Table;   

  globalFilterMC01: string = ''; 
  ingredient!: any;
 cities!: any[];
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

selectedRowData: any;

selectedProduct: any;

clienteProp: string = '';
nombreProp: string = '';
direccionProp: string = '';
otroInput: string = '';

valorActual: any;
elementosTabla: any[]=[
  {tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:''},
]


constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosBT01();
    this.cargarDatosMC01();
    this.selectedSeries = null;


    this.miFormulario = this.fb.group({
      tipoTrabajo: [''], // Puedes proporcionar un valor predeterminado si es necesario
      selectedSeries: [''],
      otroInput: [''],
      selectedSeriesInput: [''],
      fueraDeServicio: [''],
      
    });

    this.valorActual = this.miFormulario.value.tipoTrabajo;
  }

  

  filterTable() {
    this.dt.filterGlobal(this.globalFilter, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
  }
  
  clear1(table: Table) {
    this.globalFilterMC01 = '';
    table.clear();
  }

  // Función para filtrar la tabla
  filterTable1(table: Table) {
    table.filterGlobal(this.globalFilterMC01, 'contains');
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




  agregarNuevaFila() {
    const nuevaFila = {
     
    };
  
    // Determina el tipo de fila según la propiedad isBT01Selected
    if (this.isBT01Selected) {
      // Agrega la nueva fila al arreglo de BT01
      this.bt01DataArray.push(nuevaFila);
    } else {
      // Agrega la nueva fila al arreglo de MC01
      this.mc01DataArray.push(nuevaFila);
    }
  
    // Actualizar la tabla
    this.loadDataToInitialTable();
  
    // Refrescar la tabla
    if (this.isBT01Selected) {
      this.dt?.reset(); // Para BT01
    } else {
      this.mc01Table?.reset(); // Para MC01
    }
  }
  

  onDropdownChange(event: any) {
    console.log('Dropdown changed:', event.value);
  
    let selectedObject = event.value;
    console.log(event.value);
  
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
  
  
  onRowDoubleClick(event: any, rowData: any, tipo: string) {
    
  let seleccion= this.miFormulario.value.tipoTrabajo
   if(this.elementosTabla.length>0 && this.elementosTabla[0].tipo !== null ){
      if(seleccion=== 'MP1200' || seleccion==='MP1000'|| seleccion==='MP200'|| seleccion==='MP2000'|| 
      seleccion==='MP2400'|| seleccion==='MP250'|| seleccion==='MP500'|| seleccion==='MP600'){
        this.elementosTabla[this.elementosTabla.length-1]={tipo:1, U_NReparto: rowData.U_NReparto, U_NumEcon:rowData.U_NumEcon, U_GoodsBrand:rowData.U_GoodsBrand,
          U_GoodsModel:rowData.U_GoodsModel, U_GoodsSerial:rowData.U_GoodsSerial, U_OdoAct:rowData.U_OdoAct}
          this.visibleBT01Modal= false;
         this.visibleMC01Modal=false;
         
        this.elementosTabla.push({tipo:null, U_NReparto:'', U_NumEcon:'', U_GoodsBrand:'', U_GoodsModel:'',U_GoodsSerial:'', U_OdoAct:''})
      
        this.selectedRowData = rowData;
        this.clienteProp = rowData.U_CliProp;
        this.nombreProp = rowData.U_NCliProp;
        this.direccionProp = rowData.U_DCliProp;
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
       this.direccionProp = rowData.U_DCliProp;
       
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


/*
loadDataToInitialTable() {
  // Limpiar los arreglos
  this.bt01Data = [];
  this.mc01Data = [];

  // Lógica para cargar datos BT01 y asignarlos a bt01DataArray
  this.bt01DataArray.forEach(row => {
    this.bt01Data.push({ ...row });
  });

  // Lógica para cargar datos MC01 y asignarlos a mc01DataArray
  this.mc01DataArray.forEach(row => {
    this.mc01Data.push({ ...row });
  });

  // Actualizar la tabla principal
  this.dt?.reset();  // Para BT01
  this.mc01Table?.reset();  // Para MC01
}*/



  hideBT01Modal() {
    this.visibleBT01Modal = false;
  }
  
  hideMC01Modal() {
    this.visibleMC01Modal = false;
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

openNew3() {
  this.product = {};
  this.submitted = false;
 this.refacciones = true
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
