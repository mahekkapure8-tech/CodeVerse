import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice implements OnInit {

  questions: any[] = [];
  allQuestions: any[] = [];
  filteredQuestions: any[] = [];

  searchText = '';
  selectedDifficulty = '';

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {

    console.log('PRACTICE STARTED');

    this.questionService.getQuestions().subscribe({

      next: (res: any) => {

        console.log('API RESPONSE:', res);

        const data = Array.isArray(res)
          ? res
          : res.questions || [];

        console.log('API LENGTH:', data.length);

        this.questions = data;
        this.allQuestions = [...data];
        this.filteredQuestions = [...data];

        console.log('FINAL QUESTIONS:', this.filteredQuestions);
        console.log('FINAL LENGTH:', this.filteredQuestions.length);

      },

      error: (err: any) => {

        console.error('API ERROR:', err);

        this.questions = [];
        this.allQuestions = [];
        this.filteredQuestions = [];

      }

    });

  }

  filterQuestions(): void {

    const search = this.searchText
      .trim()
      .toLowerCase();

    this.filteredQuestions = this.allQuestions.filter(
      (question: any) => {

        const matchesSearch =
          !search ||
          question.title?.toLowerCase().includes(search) ||
          question.description?.toLowerCase().includes(search) ||
          question.language?.toLowerCase().includes(search);

        const matchesDifficulty =
          !this.selectedDifficulty ||
          question.difficulty === this.selectedDifficulty;

        return matchesSearch && matchesDifficulty;
      }
    );

  }

  solveQuestion(index: number): void {

    const question = this.filteredQuestions[index];

    console.log('SELECTED QUESTION:', question);

    if (!question || !question._id) {

      console.error('QUESTION ID NOT FOUND:', question);

      return;
    }

    this.router.navigate([
      '/question',
      question._id
    ]);

  }

}