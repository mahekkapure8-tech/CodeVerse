import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'https://codeverse-api-g7b5.onrender.com/api/questions';

  private executeUrl = 'https://codeverse-api-g7b5.onrender.com/api/execute';

  private submissionUrl = 'https://codeverse-api-g7b5.onrender.com/api/submissions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getQuestionById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }

  runCode(code: string, input: string) {
    return this.http.post<any>(
      this.executeUrl,
      {
        code: code,
        input: input,
        language: 'javascript'
      }
    );
  }

  submitCode(data: any) {
    return this.http.post<any>(
      `${this.submissionUrl}/add`,
      data
    );
  }
}