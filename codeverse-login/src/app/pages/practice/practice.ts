import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-practice',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './practice.html',
  styleUrl: './practice.css'
})
export class Practice implements OnInit {

  questions: any[] = [];

  allQuestions: any[] = [];

  filteredQuestions: any[] = [];

  searchText = '';

  selectedDifficulty = '';

  loading = true;


  constructor(
    private questionService: QuestionService,
    private router: Router,
    private ngZone: NgZone
  ) {}


  ngOnInit(): void {

    console.log('PRACTICE STARTED');

    this.loadQuestions();

  }


  // =====================================
  // LOAD QUESTIONS
  // =====================================

  loadQuestions(): void {

    this.loading = true;

    this.questionService
      .getQuestions()
      .subscribe({

        next: (res: any) => {

          console.log(
            'API RESPONSE:',
            res
          );


          const data = Array.isArray(res)
            ? res
            : res.questions || [];


          console.log(
            'API LENGTH:',
            data.length
          );


          // IMPORTANT:
          // Angular UI update ke andar data set kar rahe hain

          this.ngZone.run(() => {

            this.questions = [...data];

            this.allQuestions = [...data];

            this.filteredQuestions = [...data];

            this.loading = false;


            console.log(
              'FINAL QUESTIONS:',
              this.filteredQuestions
            );

            console.log(
              'FINAL LENGTH:',
              this.filteredQuestions.length
            );

          });

        },


        error: (err: any) => {

          console.error(
            'API ERROR:',
            err
          );


          this.ngZone.run(() => {

            this.questions = [];

            this.allQuestions = [];

            this.filteredQuestions = [];

            this.loading = false;

          });

        }

      });

  }


  // =====================================
  // FILTER QUESTIONS
  // =====================================

  filterQuestions(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    this.filteredQuestions =
      this.allQuestions.filter(
        (question: any) => {

          const matchesSearch =

            !search ||

            question.title
              ?.toLowerCase()
              .includes(search) ||

            question.description
              ?.toLowerCase()
              .includes(search) ||

            question.language
              ?.toLowerCase()
              .includes(search);


          const matchesDifficulty =

            !this.selectedDifficulty ||

            question.difficulty ===
            this.selectedDifficulty;


          return (
            matchesSearch &&
            matchesDifficulty
          );

        }
      );


    console.log(
      'FILTERED QUESTIONS:',
      this.filteredQuestions
    );

  }


  // =====================================
  // SOLVE QUESTION
  // =====================================

  solveQuestion(index: number): void {

    const question =
      this.filteredQuestions[index];


    console.log(
      'SELECTED QUESTION:',
      question
    );


    if (
      !question ||
      !question._id
    ) {

      console.error(
        'QUESTION ID NOT FOUND:',
        question
      );

      return;

    }


    this.router.navigate([
      '/question',
      question._id
    ]);

  }

}