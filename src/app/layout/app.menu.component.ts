import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label:'Ordenes de trabajo',
                items: [
                    { label: 'Ordenes de trabajo ', icon: 'pi pi-cog ' ,
                
                items: [
                    //{ label: 'Ordenes de trabajo ', icon: 'pi pi-cog ', routerLink: ['/ordenes'] },
                    { label: 'Creación de Órden de Trabajo ', icon: 'pi pi-cog ', routerLink: ['/ordenes'] },
                    { label: 'Busca de Órdenes de Trabajo ', icon: 'pi pi-cog ', routerLink: ['/buscaOrdenes'] },
                       ]
                
                   },
                      
                ]
            },

        ];
    }
}
