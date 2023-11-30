import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/),
        ],
      ],
    });
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }



  submitForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      // Verificar las credenciales
      if (this.authService.login(email, password)) {
        this.authService.setRedirectUrl('/dashboard');
        this.showConfirmation();
      } else {
        this.showInvalidCredentialsError();
      }
    } else {
      this.showValidationError();
    }
  }
  
  showInvalidCredentialsError() {
    Swal.fire({
      title: 'Error de autenticación',
      text: 'Credenciales incorrectas. Por favor, verifique su email y contraseña.',
      icon: 'error',
    });
  }
  

  showConfirmation() {
    Swal.fire({
      title: '¿Desea iniciar sesión con este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para iniciar sesión aquí
        console.log(this.loginForm.value);
        this.router.navigate(['/'])
        Swal.fire('Inicio de sesión exitoso!', '', 'success');
        
      }
    });
  } 

  showValidationError() {
    let errorMessage = 'Debe llenar todos los campos.';

    if (this.loginForm.get('email')?.hasError('email')) {
      errorMessage = 'Este email no es válido.';
    } else if (this.loginForm.get('password')?.hasError('pattern')) {
      errorMessage = 'La contraseña debe tener al menos 8 caracteres, al menos una mayúscula, al menos un número.';
    }

    Swal.fire({
      title: 'Error en el formulario',
      text: errorMessage,
      icon: 'error',
    });
  }

}
