import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalQuestions = 0;
  solvedQuestions = 0;
  totalSubmissions = 0;
  successRate = 0;

  constructor(private dashboardService: DashboardService,
     private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.dashboardService.getDashboard().subscribe({

      next: (res: any) => {

        console.log('DASHBOARD:', res);

        this.totalQuestions = res.totalQuestions;
        this.solvedQuestions = res.solvedQuestions;
        this.totalSubmissions = res.totalSubmissions;
        this.successRate = res.successRate;

console.log('VALUES AFTER ASSIGN:');
  console.log(this.totalQuestions);
  console.log(this.solvedQuestions);
  console.log(this.totalSubmissions);
  console.log(this.successRate);
    this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.error('DASHBOARD API ERROR:', err);

      }

    });

  }

}