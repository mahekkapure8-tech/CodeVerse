import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = "";
  email = "";
  password = "";
  confirmPassword = "";

  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register() {

    if (
      this.name === "" ||
      this.email === "" ||
      this.password === "" ||
      this.confirmPassword === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const data = {
      username: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({

      next: (res: any) => {

        alert("Registration Successful!");

        this.router.navigate(['/home']);

      },

      error: (err: any) => {

        console.error(err);

        alert(
          err.error?.message || "Registration failed"
        );

      }

    });
  }
}