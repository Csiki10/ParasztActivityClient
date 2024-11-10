import { Component } from '@angular/core';
import { AddItemComponent } from '../../components/add-item/add-item.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { GameService } from '../../services/game/game.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../../../../shared/types/items';
import { Game } from '../../../../shared/types/game';

@Component({
  selector: 'new-game',
  standalone: true,
  imports: [AddItemComponent, ItemListComponent, PrimaryButtonComponent],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
})
export class NewGameComponent {
  private nextItemId = 0;
  items: Array<Item> = [];
  game: Game | undefined;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    const gameId = localStorage.getItem('gameId');
    gameId ? this.loadGame(gameId) : this.createNewGame();
  }

  createNewGame(): void {
    this.gameService.createGame({}).subscribe(
      (game) => {
        if (!game.id) {
          console.error('Game ID not found in response');
          return;
        }

        console.log('New game created:', game);
        this.game = game;
        localStorage.setItem('gameId', game.id);
      },
      (error) => {
        console.error('Error creating game:', error);
      }
    );
  }

  loadGame(id: string) {
    this.gameService.getGameById(id).subscribe(
      (game) => {
        if (!game.id) {
          console.error('Game ID not found in response');
          return;
        }

        console.log('Game loaded:', game);
        this.game = game;
      },
      (error) => {
        console.error('Error loading game:', error);
      }
    );
  }

  handleAddItem(name: string) {
    this.items.push({ id: ++this.nextItemId, name: name });
  }
}
