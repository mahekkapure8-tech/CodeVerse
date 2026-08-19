import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice implements OnInit {

  questions: any[] = [];
  searchText = '';
  selectedDifficulty = '';

  allQuestions: any[] = [];
  filteredQuestions: any[] = [];

  constructor(
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  solveQuestion(index:number): void {
    const question = this.filteredQuestions[index];
     console.log('SELECTED QUESTION:', question);
  console.log('QUESTION ID:', question._id);
   alert('ID: ' + question._id);

  this.router.navigate(['/question', question._id]);
    
  }

  ngOnInit(): void {
    

    console.log('PRACTICE STARTED');

    this.questionService.getQuestions().subscribe({

      next: (res: any) => {

        console.log('API LENGTH:', res.length);

        this.allQuestions = [...res];

this.filteredQuestions = [...res];

this.questions = [...res];

console.log('FINAL LENGTH:', this.filteredQuestions.length);

this.cdr.detectChanges();
      },

      error: (err: any) => {
        console.error('API ERROR:', err);
      }

    });

  }
  filterQuestions(): void {

  const search = this.searchText.trim().toLowerCase();

  this.filteredQuestions = this.allQuestions.filter((question: any) => {

    const matchesSearch =
      !search ||
      question.title?.toLowerCase().includes(search) ||
      question.description?.toLowerCase().includes(search) ||
      question.language?.toLowerCase().includes(search) ||
      question.tags?.some((tag: string) =>
        tag.toLowerCase().includes(search)
      );

    const matchesDifficulty =
      this.selectedDifficulty === '' ||
      question.difficulty === this.selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

}
}