import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
}) 
export class AppTopBarComponent {

    items!: MenuItem[]; 

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    shouldShowLogoutButton: boolean = true;

    constructor(public layoutService: LayoutService, private authService: AuthService) { 
        
    }

    async logout() {
        const { value } = await Swal.fire({
          title: '¿Desea desloguearse?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        });
      
        if (value === true) {
          // Lógica de cierre de sesión
          this.authService.logout();
          Swal.fire('Logout exitoso!', '', 'success');
          // Puedes redirigir a la página de inicio de sesión o a cualquier otra página después del cierre de sesión
        }
      }
      
}
