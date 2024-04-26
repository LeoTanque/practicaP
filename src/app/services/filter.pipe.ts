import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      for (let key in item) {
        if (item[key].toString().toLowerCase().includes(searchText)) {
          return true;
        }
      }
      return false;
    });
  }
}
