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
           /*
            { 
                label:'Módulos',
                items: [
                    { label: 'Módulos ', icon: 'pi pi-cog ' ,
                
                items: [
                    
                    { label: 'Socio de negocios ', icon: 'pi pi-cog ', routerLink: ['/socio'] },
                    
                    { label: 'Compra', icon: 'pi pi-cog ', routerLink: ['/compra'] },
                    { label: 'Ventas ', icon: 'pi pi-cog ', routerLink: ['/ventas'] }, 
                    { label: 'Inventarios ', icon: 'pi pi-cog ', routerLink: ['/inventarios'] },
                 

                       ]
                
                   },
                ]
            },*/
{
    label: 'Módulos',
    items: [
        {
            label: 'Modulos', icon: 'pi pi-cog',
            items: [
                {
                    label: 'Socio de negocios', icon: 'pi pi-cog',
                    
                    items: [
                        { label: 'Datos maestros socio de negocios ', icon: 'pi pi-cog ', routerLink: ['/socio'] },
                       
                    ]
                },
                {
                    label: 'Compras', icon: 'pi pi-cog',
                    items: [
                        { label: 'Compra', icon: 'pi pi-cog ', routerLink: ['/compra'] },
                    ]
                },
                {
                    label: 'Ventas', icon: 'pi pi-cog',
                    items: [
                        { label: 'Ventas ', icon: 'pi pi-cog ', routerLink: ['/ventas'] }, 
                    ]
                },
                {
                    label: 'Inventarios', icon: 'pi pi-cog',
                    items: [
                        { label: 'Inventarios ', icon: 'pi pi-cog ', routerLink: ['/inventarios'] }, 
                    ]
                },
                {
                    label: 'Pedidos OV', icon: 'pi pi-cog',
                    items: [
                        { label: 'Pedidos ', icon: 'pi pi-cog ', routerLink: ['/pedidos'] }, 
                    ]
                },
            ]
        },
      
    ]
},
/*{ 
    label:'Ordenes de trabajo',
    items: [
        { label: 'Ordenes de trabajo ', icon: 'pi pi-cog ' ,
    
    items: [
        //{ label: 'Ordenes de trabajo ', icon: 'pi pi-cog ', routerLink: ['/ordenes'] },
        { label: 'Creación de Órden de Trabajo ', icon: 'pi pi-cog ', routerLink: ['/ordenes'] },
        { label: 'Busca de Órdenes de Trabajo ', icon: 'pi pi-cog ', routerLink: ['/buscaOrdenes'] },
        { label: 'Entrega Refacciones ', icon: 'pi pi-cog ', routerLink: ['/entrega'] }, 
        { label: 'Cambio de Odometro ', icon: 'pi pi-cog ', routerLink: ['/codometros'] },
        { label: 'Planificacion de mantenimiento ', icon: 'pi pi-cog ', routerLink: ['/administradorOrden'] },
        { label: 'Gantt ', icon: 'pi pi-cog ', routerLink: ['/gantt'] },
        { label: 'Manteniento ', icon: 'pi pi-cog ', routerLink: ['/mantenimiento'] },

           ]
    
       },
          
    ]
            },*/



        ];
    }
}
