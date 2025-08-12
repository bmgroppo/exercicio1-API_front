import { Routes } from '@angular/router';
import JogosComponent from './jogos/jogos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/jogos', pathMatch: 'full' },
  { path: 'jogos', component: JogosComponent },
];
