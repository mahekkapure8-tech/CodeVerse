import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.css'
})
export class QuestionDetail implements OnInit {

  questionId = '';
  question: any = null;

  code = '';
  output = '';

  testResults: any[] = [];
  allPassed = false;

  title = signal('');
  description = signal('');
  difficulty = signal('');
  language = signal('');
  starterCode = signal('');

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {

    this.questionId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.questionId) {
      return;
    }

    this.questionService
      .getQuestionById(this.questionId)
      .subscribe({

        next: (res: any) => {

          console.log('QUESTION DETAILS:', res);

          this.question = res;

          this.title.set(res.title || '');
          this.description.set(res.description || '');
          this.difficulty.set(res.difficulty || '');
          this.language.set(res.language || 'JavaScript');
          this.starterCode.set(res.starterCode || '');

          this.code = res.starterCode || '';

        },

        error: (err: any) => {

          console.error(
            'QUESTION DETAIL ERROR:',
            err
          );

        }

      });

  }


  // =========================
  // RUN CODE
  // =========================

  runCode(): void {

  this.output = 'Running...';
  this.testResults = [];
  this.allPassed = false;

  const tests = this.question?.testCases || [];

  if (tests.length === 0) {
    this.output = 'No test cases found';
    return;
  }

  let passedTests = 0;
  let completedTests = 0;

  const results: any[] = new Array(tests.length);

  tests.forEach((test: any, index: number) => {

    this.questionService
      .runCode(this.code, test.input)
      .subscribe({

        next: (res: any) => {

          const actual = String(res.output ?? '')
            .trim()
            .replace(/^["']|["']$/g, '');

          const expected = String(test.output ?? '')
            .trim()
            .replace(/^["']|["']$/g, '');

          const passed = actual === expected;

          if (passed) {
            passedTests++;
          }

          results[index] = {
            testNumber: index + 1,
            input: test.input,
            expected: expected,
            actual: actual,
            passed: passed
          };

          completedTests++;

          if (completedTests === tests.length) {

            this.testResults = [...results];

            this.allPassed =
              passedTests === tests.length;

            this.output =
              `${passedTests}/${tests.length} test cases passed`;

            console.log(
              'FINAL TEST RESULTS:',
              this.testResults
            );
          }

        },

        error: (err: any) => {

          console.error(
            'TEST ERROR:',
            err
          );

          results[index] = {
            testNumber: index + 1,
            input: test.input,
            expected: test.output,
            actual: 'Execution Error',
            passed: false
          };

          completedTests++;

          if (completedTests === tests.length) {

            this.testResults = [...results];

            this.allPassed = false;

            this.output =
              `${passedTests}/${tests.length} test cases passed`;

            console.log(
              'FINAL TEST RESULTS:',
              this.testResults
            );
          }

        }

      });

  });

}
submitCode(): void {

  if (!this.allPassed) {
    this.output = '❌ Please pass all test cases first.';
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    this.output = '❌ Please login first.';
    return;
  }

  const data = {
    questionId: this.questionId,
    code: this.code,
    language: this.language(),
    status: 'Accepted',
    passedTests: this.testResults.filter(
      (test: any) => test.passed
    ).length,
    totalTests: this.testResults.length
  };

  console.log('SUBMISSION DATA:', data);

  this.questionService.submitCode(data).subscribe({

    next: (res: any) => {

      console.log('SUBMISSION RESPONSE:', res);

      this.output = '🎉 Solution Submitted Successfully!';

    },

    error: (err: any) => {

      console.error('SUBMISSION ERROR:', err);

      this.output =
        err.error?.error ||
        err.error?.message ||
        '❌ Submission failed';

    }

  });
}
}