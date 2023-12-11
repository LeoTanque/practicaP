import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { CreacionOrdenesService } from 'src/app/services/creacion-ordenes.service';

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

constructor(private creacionOrdenesService:CreacionOrdenesService, private fb: FormBuilder){



 
}


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
      
    });
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


  loadDataToInitialTable1() {
    // Lógica para cargar datos BT01 y asignarlos a bt01DataArray
    this.bt01DataArray ; // Asigna los datos BT01 aquí
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
  
  

  

  
  
  /*
  onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);

    // Establece las variables en función de la opción seleccionada
    this.isBT01Selected = event.value === 'BT01';
    this.isMC01Selected = event.value === 'MC01';

    // Puedes agregar lógica adicional aquí según sea necesario

    // Muestra el modal correspondiente en función de la opción seleccionada
    if (this.isBT01Selected) {
      this.visibleBT01Modal = true;
    } else if (this.isMC01Selected) {
      this.visibleMC01Modal = true;
    }
  }*/

  onTipoChange(event: any) {
    console.log('Tipo changed:', event.value);
  
    // Establece las variables en función de la opción seleccionada
    this.isBT01Selected = event.value === 'BT01';
    this.isMC01Selected = event.value === 'MC01';
  
    if (this.isBT01Selected) {
      this.visibleBT01Modal = true;
      this.cargarDatosBT01(); 
    
    } else if (this.isMC01Selected) {
      this.visibleMC01Modal = true;
      this.cargarDatosMC01();
    }
  }
 

 

  onRowDoubleClick(event: any, rowData: any, tipo: string) {
    // Obtén los datos de la fila seleccionada
    console.log('Datos de la fila seleccionada:', rowData);

    // Limpiar la tabla antes de agregar nuevos datos
    
    // Agrega lógica adicional según el tipo (BT01 o MC01)
    if (tipo === 'BT01') {
      // Asegúrate de tener la propiedad bt01DataArray definida
      this.bt01DataArray = [rowData];  // Aquí estamos asignando un nuevo array con un solo elemento
      console.log(rowData);

      // También puedes cerrar el modal BT01 aquí si es necesario
      this.visibleBT01Modal = false;
    } else if (tipo === 'MC01') {
      // Asegúrate de tener la propiedad mc01DataArray definida
      this.mc01DataArray = [rowData];  // Aquí estamos asignando un nuevo array con un solo elemento
      console.log(rowData);
      // También puedes cerrar el modal MC01 aquí si es necesario
      this.visibleMC01Modal = false;
    }

    // Asigna los datos a la variable selectedRowData
    this.selectedRowData = rowData;

    this.clienteProp = rowData.U_CliProp;
    this.nombreProp = rowData.U_NCliProp;
    this.direccionProp = rowData.U_DCliProp;
    // Puedes realizar otras acciones según sea necesario
  }


// Método para cargar los datos en la primera tabla
loadDataToInitialTable() {
  // Asegúrate de tener la lógica adecuada para cargar los datos en tu tabla principal
  // Por ejemplo, podrías hacer algo como:
  this.bt01DataArray.forEach(row => {
    this.bt01Data.push(row);
  });
  this.mc01DataArray.forEach(row => {
    this.mc01Data.push(row);
  });
}


  hideBT01Modal() {
    this.visibleBT01Modal = false;
  }
  
  hideMC01Modal() {
    this.visibleMC01Modal = false;
  }




/*
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.selectedSeries && target) {
      this.selectedSeries.U_NextNum = target.value;
    }
  }*/

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

}
