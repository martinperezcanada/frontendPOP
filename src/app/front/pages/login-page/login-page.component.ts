import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/front/home']);
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          if (error.status === 201) {
            this.loginError = true; 
            alert('Credenciales Correctas');
            this.router.navigate(['/front/home']);
          } else {
            alert('Email invalido.');
          }
        }
      );
    }
  }
}
