import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private redirectUrl: string = '/';
  private userName: string = ''; 
  apiUrl = enviroment.apiUrl


  constructor(private router: Router,private http: HttpClient) { }
 



login(usuario: string, password:string){

   return this.http.post(`/api/LoginService/Acceder`, {UserCode:usuario, UserPassWord:password})
   .pipe(
    tap((res: any) => {
      if (res.ResultCode === 0 && res.Detail && res.Detail.Active === '1') {
        this.updateActivoState('1');
        localStorage.setItem('UserName', res.Detail.UserName); // Guarda el nombre de usuario en localStorage
      }
    })
  );
} 



logout(): void {
  // Lógica de cierre de sesión
  this.isAuthenticated = false;
  this.userName = '';
  localStorage.setItem('Activo', '0'); // Guarda "Activo" como "0" al cerrar sesión
  localStorage.removeItem('UserName');
  this.router.navigate(['/auth']);
}
/*
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }*/

  isLoggedIn(): boolean {
    const activo = localStorage.getItem('Activo');
    return activo === '1';
  }
  

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
/*
  getUserDisplayName(): string {
    return this.userName;
  }*/

  getUserDisplayName(): string {
    return localStorage.getItem('UserName') || '';
  }
 
  updateActivoState(activo: string): void {
    localStorage.setItem('Activo', activo);
  }

}
