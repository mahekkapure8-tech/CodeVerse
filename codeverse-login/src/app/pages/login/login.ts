import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
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

  email = "";
  password = "";

  showPassword = false;
  constructor(
  private authService: AuthService,
  private router: Router
) {}

  login() {

    if (this.email === "" || this.password === "") {
      alert("Please fill all fields.");
      return;
    }
const loginData = {
    email: this.email,
    password: this.password
  };

  this.authService.login(loginData).subscribe({

    next: (res:any) => {
        console.log("LOGIN RESPONSE:", res);

      localStorage.setItem("token", res.token);

      alert(res.message);

      this.router.navigate(["/home"]);

    },

    error: (err:any) => {

      alert(err.error.message);

    }

  });

}
}
