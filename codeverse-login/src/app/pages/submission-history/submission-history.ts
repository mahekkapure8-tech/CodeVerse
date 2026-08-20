import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-submission-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submission-history.html',
  styleUrl: './submission-history.css'
})
export class SubmissionHistory implements OnInit {

  submissions: any[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    alert("Submission History Loaded");
;

    const token = localStorage.getItem('token');

const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
});

    this.http
  .get<any>(
'https://codeverse-backend-9nx6.onrender.com/api/submissions/history',
    { headers }
  
      )
      .subscribe({

        next: (res: any) => {

          this.submissions = [...res.submissions];

          this.loading = false;

          this.cdr.detectChanges();

          console.log("FINAL:", this.submissions);

        },

        error: (err: any) => {

          console.error("SUBMISSION HISTORY ERROR:", err);

          this.loading = false;

          alert("API ERROR: " + JSON.stringify(err));

        }

      });

  }
}