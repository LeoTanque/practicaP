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
      email: ['', [Validators.required]],
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


/*
  submitForm1() {
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

  submitForm2() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (res: any) => {
          console.log(res)
          if (res.Detail.Active === '1') {
            this.authService.updateActivoState('1');
            this.router.navigate(['/'])
          } else {
            this.showInvalidCredentialsError();
          }
        },
        (error) => {
          if (error.status === 401) {
            this.showInvalidUserError();
          } else if (error.status === 403) {
            this.showInvalidPasswordError();
          } else {
            console.error(error);
            this.showGeneralError();
          }
        }
      );
    } else {
      this.showValidationError();
    }
  }

  submitForm3() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (res: any) => {
          console.log(res)
          if (res.ResultCode === 0 && res.Detail && res.Detail.Active === '1') {
            this.authService.updateActivoState('1');
            this.router.navigate(['/'])
          } else {
            this.showInvalidCredentialsError();
          }
        },
        (error) => {
          if (error?.error?.ResultMessage === 'Error de autenticación') {
            this.showInvalidCredentialsError();
          } else {
            console.error(error);
            this.showGeneralError();
          }
        }
      );
    } else {
      this.showValidationError();
    }
  }*/

  submitForm() {
    const staticUsername = 'leo';
    const staticPassword = '123';
  
    // Verificar si el usuario y la contraseña son correctos
    if (this.loginForm.get('email')?.value === staticUsername && this.loginForm.get('password')?.value === staticPassword) {
      // Usuario y contraseña son correctos
      this.authService.updateActivoState('1');
      this.router.navigate(['/']);
    } else {
      // Usuario o contraseña son incorrectos
      this.showInvalidCredentialsError();
    }
  }
  
  
  submitForm1() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (res: any) => {
          console.log(res);
          if (res.ResultCode === 0 && res.Detail && res.Detail.Active === '1') {
            this.authService.updateActivoState('1');
            this.router.navigate(['/']);
          } else {
            this.showInvalidCredentialsError();
          }
        },
        (error) => {
          if (error?.error?.ResultMessage === 'Error de autenticación') {
            const detail = error?.error?.Detail;
            if (detail === null) {
              this.showInvalidCredentialsError(); // Usuario y contraseña incorrectos
            } else if (detail?.Active !== '1') {
              this.showInvalidUserError(); // Usuario incorrecto
            } else {
              this.showInvalidPasswordError(); // Contraseña incorrecta
            }
          } else {
            console.error(error);
            this.showGeneralError();
          }
        }
      );
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

  showInvalidUserError() {
    Swal.fire({
      title: 'Error de autenticación',
      text: 'Usuario incorrecto. Por favor, verifique su usuario.',
      icon: 'error',
    });
  }

  showInvalidPasswordError() {
    Swal.fire({
      title: 'Error de autenticación',
      text: 'Contraseña incorrecta. Por favor, verifique su contraseña.',
      icon: 'error',
    });
  }

  showGeneralError() {
    Swal.fire({
      title: 'Error',
      text: 'Se produjo un error. Por favor, inténtelo de nuevo más tarde.',
      icon: 'error',
    });
  }
}
