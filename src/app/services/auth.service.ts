import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private redirectUrl: string = '/';
  private userName: string = ''; 
  constructor(private router: Router,) { }

  login(email: string, password: string): boolean {
    // Simula la lógica de autenticación
    if (email === 'leo@gmail.com' && password === 'Leodanis.123') {
      this.isAuthenticated = true;
      this.userName = 'Leo';
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }
 
  logout(): void {
    // Lógica de cierre de sesión
    this.isAuthenticated = false;
    this.userName = '';
    this.router.navigate(['/auth'])
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  getUserDisplayName(): string {
    return this.userName;
  }
 
}
