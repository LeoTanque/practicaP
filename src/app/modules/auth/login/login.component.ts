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
      email: ['', [Validators.required,]],
      password: [
        '',
        [
          Validators.required,
          
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
      this.authService.login(email,password).subscribe(
        (res:any)=>{
          console.log(res)
          if(res.Detail.Active==='1'){
            //salvar Activo con valor 1 en localstore
            this.authService.updateActivoState('1');
            this.router.navigate(['/'])
          }
          else{
            this.showInvalidCredentialsError()
          }
        }
      )
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
