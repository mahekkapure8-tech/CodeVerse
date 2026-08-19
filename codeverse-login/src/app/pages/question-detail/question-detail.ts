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

  // ==============================
  // LOAD QUESTION
  // ==============================

  ngOnInit(): void {

    this.questionId =
      this.route.snapshot.paramMap.get('id') || '';

    console.log(
      'QUESTION ID:',
      this.questionId
    );

    if (!this.questionId) {
      return;
    }

    this.questionService
      .getQuestionById(this.questionId)
      .subscribe({

        next: (res: any) => {

          console.log(
            'QUESTION DETAILS:',
            res
          );

          this.question = res;

          this.title.set(
            res.title || ''
          );

          this.description.set(
            res.description || ''
          );

          this.difficulty.set(
            res.difficulty || ''
          );

          this.language.set(
            res.language || ''
          );

          this.starterCode.set(
            res.starterCode || ''
          );

          // Put starter code inside editor
          this.code =
            res.starterCode || '';

        },

        error: (err: any) => {

          console.error(
            'QUESTION DETAIL ERROR:',
            err
          );

        }

      });

  }


  // ==============================
  // RUN CODE
  // ==============================

  runCode(): void {

    console.time(
      'TOTAL RUN TIME'
    );

    console.log(
      'RUN CODE CLICKED:',
      new Date().toISOString()
    );

    this.output = 'Running...';

    this.testResults = [];

    this.allPassed = false;

    const tests =
      this.question?.testCases || [];

    if (tests.length === 0) {

      this.output =
        'No test cases found';

      console.timeEnd(
        'TOTAL RUN TIME'
      );

      return;
    }

    let completedTests = 0;

    let passedTests = 0;


    tests.forEach(
      (test: any, index: number) => {

        console.time(
          `TEST ${index + 1}`
        );


        this.questionService
          .runCode(
            this.code,
            test.input
          )
          .subscribe({

            // ==============================
            // SUCCESS
            // ==============================

            next: (res: any) => {

              console.timeEnd(
                `TEST ${index + 1}`
              );

              console.log(
                'OUTPUT RECEIVED:',
                new Date().toISOString()
              );

              console.log(
                'RESPONSE:',
                res
              );


              const actual = String(
  res.output ?? ''
).trim().replace(/^["']|["']$/g, '');

const expected = String(
  test.output ?? ''
).trim().replace(/^["']|["']$/g, '');


console.log('ACTUAL OUTPUT:', JSON.stringify(actual));
console.log('EXPECTED OUTPUT:', JSON.stringify(expected));
console.log('MATCH:', actual === expected);
const passed = actual === expected;


              if (passed) {

                passedTests++;

              }


              this.testResults.push({

                testNumber:
                  index + 1,

                input:
                  test.input,

                expected:
                  expected,

                actual:
                  actual,

                passed:
                  passed

              });


              completedTests++;


              // ==============================
              // ALL TESTS COMPLETED
              // ==============================

              if (
                completedTests ===
                tests.length
              ) {

                this.allPassed =
                  passedTests ===
                  tests.length;


                this.output =
                  `${passedTests}/${tests.length} test cases passed`;


                console.log(
                  'FINAL TEST RESULT:',
                  this.testResults
                );


                console.timeEnd(
                  'TOTAL RUN TIME'
                );

              }

            },


            // ==============================
            // ERROR
            // ==============================

            error: (err: any) => {

              console.timeEnd(
                `TEST ${index + 1}`
              );


              console.error(
                `TEST ${index + 1} ERROR:`,
                err
              );


              this.testResults.push({

                testNumber:
                  index + 1,

                input:
                  test.input,

                expected:
                  test.output,

                actual:
                  'Execution Error',

                passed:
                  false

              });


              completedTests++;


              if (
                completedTests ===
                tests.length
              ) {

                this.allPassed =
                  false;


                this.output =
                  `${passedTests}/${tests.length} test cases passed`;


                console.timeEnd(
                  'TOTAL RUN TIME'
                );

              }

            }

          });

      }

    );

  }


  // ==============================
  // SUBMIT CODE
  // ==============================

  submitCode(): void {

    if (!this.allPassed) {

      this.output =
        '❌ Please pass all test cases first.';

      return;
    }

const token = localStorage.getItem('token');

if (!token) {
  this.output = '❌ Please login first.';
  return;
}

const payload = JSON.parse(atob(token.split('.')[1]));

const data = {
  questionId: this.questionId,
  userId: payload.id,
  code: this.code,
  language: this.language(),
  status: 'Accepted',
  passedTests: this.testResults.filter(
    (test: any) => test.passed
  ).length,
  totalTests: this.testResults.length
};

console.log('SUBMISSION DATA:', data);


    this.questionService
      .submitCode(data)
      .subscribe({

        // ==============================
        // SUBMISSION SUCCESS
        // ==============================

        next: (res: any) => {

          console.log(
            'SUBMISSION RESPONSE:',
            res
          );


          this.output =
            '🎉 Solution Submitted Successfully!';

        },


        // ==============================
        // SUBMISSION ERROR
        // ==============================

        error: (err: any) => {

          console.error(
            'SUBMISSION ERROR:',
            err
          );


          this.output =
            err.error?.error ||
            '❌ Submission failed';

        }

      });

  }

}