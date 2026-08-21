import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

  if (!this.email || !this.password) {
    alert('Please fill all fields.');
    return;
  }

  const loginData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(loginData).subscribe({

    next: (res: any) => {

      console.log('LOGIN RESPONSE:', res);

      if (!res.token) {
        console.error('TOKEN NOT RECEIVED:', res);
        alert('Login failed: token not received');
        return;
      }

      localStorage.setItem('token', res.token);

      console.log(
        'TOKEN SAVED:',
        localStorage.getItem('token')
      );

      alert(res.message);

      this.router.navigate(['/home']);

    },

    error: (err: any) => {

      console.error('LOGIN ERROR:', err);

      alert(
        err.error?.message ||
        'Login failed'
      );

    }

  });
}
}