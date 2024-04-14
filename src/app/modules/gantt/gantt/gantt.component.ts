import { Component, OnInit } from '@angular/core';
import { GanttService } from 'src/app/services/gantt.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit{
  
  data: any;
  options: any; 
  tareas: any[]=[];

  /*tareas: any[] = [
    { id: 1, tarea: 'Desarmar parte inferior', duracion: [[0, 1]], tecnico:'leo' },
    { id: 2, tarea: 'Desarmar la cuchilla', duracion: [[1, 2]] , tecnico:'leo' },
    { id: 3, tarea: 'Revisión el estado', duracion: [[2, 3]], tecnico:'leo' },
    { id: 4, tarea: 'Revisión de sistema eléctrico', duracion: [[3, 6]], tecnico:'leo' },
    { id: 5, tarea: 'Engrasar y Lubricar', duracion: [[6, 7]], tecnico:'leo' },
    { id: 6, tarea: 'Revision de Pernos', duracion: [[7, 8]], tecnico:'leo' },
    { id: 7, tarea: 'Desmontaje y Revision de ornillas', duracion: [[8, 9]], tecnico:'leo' },
    { id: 8, tarea: 'Revisión del clutch', duracion: [[9, 10]] , tecnico:'leo'},
    { id: 9, tarea: 'Limpieza y Revición de resortes', duracion: [[10, 12]], tecnico:'leo' },
      
  ];*/

  displayModal: boolean = false;
  selectedTask: any;
  duracionInicio: number = 0;
  duracionFin: number = 0;

  constructor(private dataService: GanttService,  private cdr: ChangeDetectorRef) {
   
   }


  ngOnInit() {
    this.tareas = this.dataService.getTareas();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const etiquetasY = this.generarEtiquetasY();
    const datos = this.generarDatos();
/*
    this.data = {
      datasets: [
        {
          label: '', 
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 5,
          data: datos,
          
        },
      ]
    };*/

    this.actualizarDatos();

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      layout: {
        padding: {}
      },
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: { dataset: any; dataIndex: string | number; }) => {
              const dataset = context.dataset;
              const data = dataset.data[context.dataIndex];
              if (data.diferenciaTiempo !== undefined) {
                const tarea = this.tareas.find((t: any) => t.id === data.y)?.tarea;
                if (tarea) {
                  return `${tarea} dura ${data.diferenciaTiempo} Horas`;
                 
                } else {
                  return `Tarea no encontrada`;
                }
              } else {
                return `${dataset.label}: [${data.x[0]} , ${data.x[1]}]`;
              }
            }
            


          }
        }
      },
      scales: {
        x: {
          position: 'top',
          ticks: {
            min: 0,
            max: 24,
            stepSize: 1,
            autoSkip: false,
            color: textColorSecondary,
            font: {
              weight: 500,
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          position: 'left',
          ticks: {
            color: textColorSecondary,
            font: {
              family: 'monospace',
              weight: 500,
            },
            align: 'start',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          },
          labels: etiquetasY,
        }
      }
    };

    this.actualizarLabelsDataset();
    
  }


  actualizarDatos() {
    this.tareas = this.dataService.getTareas();
    const etiquetasY = this.generarEtiquetasY();
    const datos = this.generarDatos();
    this.actualizarGrafico(datos, etiquetasY);
  }


   actualizarGrafico(datos: any[], etiquetasY: string[]) {
    this.data = {
      datasets: [
        {
          label: '', 
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 5,
          data: datos,
          
        },
      ]
    };
  }
  
  generarEtiquetasY() {
    const maxLengthId = Math.max(...this.tareas.map(t => t.id.toString().length));
    const maxLengthTarea = Math.max(...this.tareas.map(t => t.tarea.length));
    return this.tareas.map(t => `${t.id.toString().padEnd(maxLengthId)}   ${t.tarea.padEnd(maxLengthTarea)}`);
  }

  generarDatos() {
    const datos:any = [];
    this.tareas.forEach(tarea => {
      tarea.duracion.forEach((intervalo: number[]) => {
        const diferenciaTiempo = intervalo[1] - intervalo[0];
        datos.push({ x: intervalo, y: tarea.id, diferenciaTiempo: diferenciaTiempo });
      });
    });
    return datos;
  }

 

  
  
  handleDataSelect(event: any) {
    const datasetIndex = event.element.datasetIndex;
    const dataIndex = event.element.index;
    const clickedData = this.data.datasets[datasetIndex].data[dataIndex];
    const taskId = clickedData.y;
  
    // Buscar la tarea correspondiente
    const tareaSeleccionada = this.tareas.find(tarea => tarea.id === taskId);
  
    if (tareaSeleccionada) {
      const nombreTarea = tareaSeleccionada.tarea;
      const duracion = `${clickedData.x[0]} - ${clickedData.x[1]}`; // Duración en formato de inicio - fin
      const duracionInicio = clickedData.x[0];
      const duracionFin = clickedData.x[1];
      console.log('ID de la tarea seleccionada:', taskId);
      console.log('Tarea seleccionada:', nombreTarea);
      console.log('Duración Inicial:', duracionInicio);
      console.log('Duración (Fin):', duracionFin);
      const clickedDataset = this.data.datasets[event.datasetIndex];
      const taskIndex = event.element.index;
      const selectedTaskData = this.tareas[taskIndex];
      this.selectedTask = selectedTaskData;


      this.duracionInicio = duracionInicio;
      this.duracionFin = duracionFin;
      // Abrir el modal
      this.displayModal = true;
    } else {
      console.log('Tarea no encontrada');
    }
  }

/*
  guardarCambios1() {
    // Buscar la tarea correspondiente en base al ID seleccionado
    const tareaSeleccionada = this.tareas.find(tarea => tarea.id === this.selectedTask.id);
    if (tareaSeleccionada) {
      // Actualizar la duración de la tarea
      const index = this.tareas.indexOf(tareaSeleccionada);
      this.tareas[index].duracion = [[this.duracionInicio, this.duracionFin]];
      console.log(this.duracionFin)
      // Actualizar el front-end
      this.actualizarLabelsDataset();
    }
    // Cerrar el modal
    this.hideDialog();
  }


  guardarCambios2() {
    // Buscar la tarea correspondiente en base al ID seleccionado
    const tareaSeleccionada = this.tareas.find(tarea => tarea.id === this.selectedTask.id);
    if (tareaSeleccionada) {
      // Actualizar la duración de la tarea
      const index = this.tareas.indexOf(tareaSeleccionada);
      this.tareas[index].duracion = [[this.duracionInicio, this.duracionFin]];

      const nuevaDuracion = this.duracionFin - this.duracionInicio;
      // Imprimir los datos de la nueva duración en la consola
      console.log('Nueva duración:', this.tareas[index].duracion);
      console.log('Nueva duración:', nuevaDuracion);
      // Actualizar el front-end
      this.generarDatos();
    }
    // Cerrar el modal
    this.hideDialog();
  }
  

  guardarCambios3() {
    // Buscar la tarea correspondiente en base al ID seleccionado
    const tareaIndex = this.tareas.findIndex(tarea => tarea.id === this.selectedTask.id);
    if (tareaIndex !== -1) {
      // Actualizar la duración de la tarea
      this.tareas[tareaIndex].duracion = [[this.duracionInicio, this.duracionFin]];
  
      // Calcular la nueva duración
      const nuevaDuracion = this.duracionFin - this.duracionInicio;
      // Imprimir los datos de la nueva duración en la consola
      console.log('Nueva duración:', this.tareas[tareaIndex].duracion);
      console.log('Nueva duración:', nuevaDuracion);
      // Actualizar el front-end
      this.actualizarLabelsDataset();
    }
    // Cerrar el modal
    this.hideDialog();
  }*/
  
 
  guardarCambios() {
    // Buscar la tarea correspondiente en base al ID seleccionado
    const tareaSeleccionada = this.tareas.find(tarea => tarea.id === this.selectedTask.id);
    if (tareaSeleccionada) {
      // Actualizar la duración de la tarea
      const index = this.tareas.indexOf(tareaSeleccionada);
      this.tareas[index].duracion = [[this.duracionInicio, this.duracionFin]];
      const cDuracion =  this.tareas[index].duracion
      const nuevaDuracion = this.duracionFin - this.duracionInicio;
      // Imprimir los datos de la nueva duración en la consola
      console.log('Nueva duración:', cDuracion);
      console.log('Nueva duración:', nuevaDuracion);
      // Actualizar el front-end

      this.dataService.guardarTareas(this.tareas);
      this.actualizarDatos();
      this.hideDialog();
      console.log(this.tareas)
      //this.cdr.detectChanges();
    }
    // Cerrar el modal
    this.hideDialog();
  }
  

  actualizarGrafico1() {
    // Generar nuevamente los datos para el gráfico
    const datos = this.generarDatos();
    // Actualizar el gráfico con los nuevos datos
    this.data.datasets[0].data = datos;
    // Actualizar etiquetas del gráfico si es necesario
    this.actualizarLabelsDataset();
    this.cdr.detectChanges();
  }

  actualizarLabelsDataset() {
    this.data.datasets.forEach((dataset: { data: { y: number; label?: string }[]; }) => {
      dataset.data.forEach((dataPoint: { y: number; label?: string }) => {
        const tarea = this.tareas[dataPoint.y - 1].tarea; // Obtén el nombre de la tarea para el punto de datos actual
        dataPoint.label = ` ${tarea}`;
      });
    });
  }
  
  
  

  actualizarDuracion(nuevoValor: number, tipo: string) {
    if (tipo === 'inicio') {
      this.duracionInicio = nuevoValor;
    } else {
      this.duracionFin = nuevoValor;
    }
  
    // Actualizar duración en el objeto tareas
    const tareaSeleccionada = this.tareas.find(tarea => tarea.id === this.selectedTask.id);
    if (tareaSeleccionada) {
      const index = this.tareas.indexOf(tareaSeleccionada);
      this.tareas[index].duracion = [[this.duracionInicio, this.duracionFin]];
    }
  }
  


  hideDialog() {
   this.displayModal = false
  }


}
