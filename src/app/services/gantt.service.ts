import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GanttService {
  private defaultTareas() {
    return [
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
  }

  getTareas() {
    const storedTareas = localStorage.getItem('tareas');
    return storedTareas ? JSON.parse(storedTareas) : this.defaultTareas(); // Retorna las tareas almacenadas o las tareas por defecto si no hay ninguna
  }

  // Método para guardar las tareas en el almacenamiento local del navegador
  guardarTareas(tareas: any[]) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  // Método para crear tareas por defecto si no hay ninguna almacenada
 
}

