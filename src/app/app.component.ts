import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewGameComponent } from './features/new-game/pages/new-game/new-game.component';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewGameComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'paraszt-activity';
}
