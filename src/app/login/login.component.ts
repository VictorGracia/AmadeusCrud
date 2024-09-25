import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/']);
        },
        error => {
          if (error === 'Usuario o contraseña incorrectos') {
            this.error = error; // Muestra el error específico 401
          } else {
            this.error = 'El usuario es: test y la constraseña: password';
          }
        }
      );
  }
}
