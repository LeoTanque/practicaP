import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit{
  data: any;
  options: any;
  tareas: any[] = [
    { id: 1, tarea: 'Desarmar parte inferior', duracion: [[0, 1]], tecnico:'leo' },
    { id: 2, tarea: 'Desarmar la cuchilla', duracion: [[1, 2]] , tecnico:'leo' },
    { id: 3, tarea: 'Revisión el estado', duracion: [[2, 3]], tecnico:'leo' },
    { id: 4, tarea: 'Revisión de sistema eléctrico', duracion: [[3, 6]], tecnico:'leo' },
    { id: 5, tarea: 'Engrasar y Lubricar', duracion: [[6, 7]], tecnico:'leo' },
    { id: 6, tarea: 'Revision de Pernos', duracion: [[7, 8]], tecnico:'leo' },
    { id: 7, tarea: 'Desmontaje y Revision de ornillas', duracion: [[8, 9]], tecnico:'leo' },
    { id: 8, tarea: 'Revisión del clutch', duracion: [[9, 10]] , tecnico:'leo'},
    { id: 9, tarea: 'Limpieza y Revición de resortes', duracion: [[10, 12]], tecnico:'leo' },
      
  ];

  intervalos: boolean = false;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const etiquetasY = this.generarEtiquetasY();
    const datos = this.generarDatos();

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
            /*
            label: (context: { dataset: any; dataIndex: string | number; }) => {
              const dataset = context.dataset;
              const data = dataset.data[context.dataIndex];
              const tarea = this.tareas[data.y - 1].tarea;
              return `${tarea} dura ${data.diferenciaTiempo} Horas`;
            }*/

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

  actualizarLabelsDataset() {
    this.data.datasets.forEach((dataset: { label: string; data: { y: number; }[]; }) => {
      const tarea = this.tareas[dataset.data[0].y - 1].tarea; // Obtén el nombre de la tarea para el primer punto del dataset
      dataset.label = ` ${tarea}`;
    });
  }

  

  showDialog1() {
    this.intervalos = true;
  }



  
}
