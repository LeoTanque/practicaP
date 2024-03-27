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
    
    { id: 1, tarea: 'Desarmar parte inferior' },
    { id: 2, tarea: 'Desarmar la cuchilla' },
    { id: 3, tarea: 'Revisión el estado' },
    { id: 4, tarea: 'Revisión de sistema eléctrico' },
    { id: 5, tarea: 'Engrasar y Lubricar' },
    { id: 6, tarea: 'Revision de Pernos' },
    { id: 7, tarea: 'Desmontaje y Revision de ornillas' },
    { id: 8, tarea: 'Revisión del clutch' },
    { id: 9, tarea: 'Limpieza y Revición de resortes' }

  ];

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const etiquetasY = this.generarEtiquetasY();

    this.data = {
      datasets: [
        {
          label: '', 
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1,
          borderSkipped: false,
          borderRadius: 5,
          data: [
            { x: [0, 1], y: 1, diferenciaTiempo: 1 },
            { x: [1, 2], y: 2, diferenciaTiempo: 1 },
            { x: [2, 3], y: 3, diferenciaTiempo: 1 },
            { x: [3, 6], y: 4, diferenciaTiempo: 3 },
            { x: [6, 7], y: 5, diferenciaTiempo: 1 },
            { x: [7, 8], y: 6, diferenciaTiempo: 1 },
            { x: [8, 9], y: 7, diferenciaTiempo: 1 },
            { x: [9, 10], y: 8, diferenciaTiempo: 1 },
            { x: [10, 12], y: 9, diferenciaTiempo: 2 },
          ],
        },
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      //responsive: true,
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
                const tarea = this.tareas[data.y - 1].tarea;
                return `${tarea} dura ${data.diferenciaTiempo} Horas`;
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

    // Actualiza el label del dataset con el nombre de la tarea
    this.actualizarLabelsDataset();
  }

  generarEtiquetasY() {
    const maxLengthId = Math.max(...this.tareas.map(t => t.id.toString().length));
    const maxLengthTarea = Math.max(...this.tareas.map(t => t.tarea.length));
    return this.tareas.map(t => `${t.id.toString().padEnd(maxLengthId)}   ${t.tarea.padEnd(maxLengthTarea)}`);
  }

  actualizarLabelsDataset() {
    this.data.datasets.forEach((dataset: { label: string; data: { y: number; }[]; }) => {
      const tarea = this.tareas[dataset.data[0].y - 1].tarea; // Obtén el nombre de la tarea para el primer punto del dataset
      dataset.label = ` ${tarea}`;
    });
  }
}
