import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
        // Verificar si alguna de las propiedades incluye el texto de búsqueda
        return Object.values(item).some((val: any) => val.toString().toLowerCase().includes(searchText));
      });
    
  }
}
