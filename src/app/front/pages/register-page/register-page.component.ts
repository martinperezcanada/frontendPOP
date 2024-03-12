import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  registrationSuccess: boolean = false; 
  token: string = ''; 
  registering: boolean = false;
  emailInUse: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registering = true;
      const { nombre, email, contraseña } = this.registerForm.value;
      this.authService.register(nombre, email, contraseña).subscribe(
        response => {
          this.registering = false;
          this.registrationSuccess = true;
          this.token = response.token;          
          this.router.navigate(['/front/home']);
        },
        error => {
          this.registering = false;
          console.error('Error al registrar:', error);
          if (error.status === 201) {
            this.emailInUse = true; 
            alert('Usuario registrado correctamente');
            this.router.navigate(['/front/home']);
          } else {
            alert('Email en uso.');
          }
        }
      );
    }
  }
}
