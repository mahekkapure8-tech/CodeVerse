import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  logout(): void {

    const token = localStorage.getItem('token');

    this.http.post(
      'https://crestless-overfull-scrunch.ngrok-free.dev/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (res: any) => {

        console.log('LOGOUT RESPONSE:', res);

        localStorage.removeItem('token');

        alert(
          `Logout Successful!\nSession Duration: ${res.sessionDuration} minutes`
        );

        this.router.navigate(['/login']);
      },

      error: (err: any) => {

        console.error('LOGOUT ERROR:', err);

        // Backend fail ho tab bhi local token delete karo
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
      }
    });
  }
}