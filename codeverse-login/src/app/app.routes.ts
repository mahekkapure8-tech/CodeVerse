import { Routes } from '@angular/router';
import { SubmissionHistory } from './pages/submission-history/submission-history';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Practice } from './pages/practice/practice';
import { QuestionDetail } from './pages/question-detail/question-detail';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },
{
  path: 'home',
  component: Home
},
  {
    path: 'practice',
    component: Practice
  },

  {
    path: 'question/:id',
    component: QuestionDetail
  },
  {
  path: 'submission-history',
  component: SubmissionHistory
},
{
  path: 'dashboard',
  component: Dashboard
},

];