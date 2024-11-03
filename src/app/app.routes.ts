import { Routes } from '@angular/router';
import { NewGameComponent } from './features/new-game/pages/new-game/new-game.component';

export const routes: Routes = [
  { path: '', component: NewGameComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: '**', redirectTo: 'new-game' },
];
