import { Component } from '@angular/core';
import { AddItemComponent } from '../../components/add-item/add-item.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'new-game',
  standalone: true,
  imports: [AddItemComponent, ItemListComponent, PrimaryButtonComponent],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
})
export class NewGameComponent {
  items: Array<string> = [];
  game$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['gameId'];
    id ? this.loadGame(id) : this.createNewGame();
  }

  createNewGame(): void {
    this.gameService.createGame({}).subscribe(
      (game) => {
        if (!game.id) {
          console.error('Game ID not found in response');
          return;
        }

        console.log('New game created:', game);
        this.game$.next(game.id);
        const queryParams: Params = { gameId: game.id };

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams,
        });
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
        this.game$.next(game.id ?? '');
      },
      (error) => {
        console.error('Error loading game:', error);
      }
    );
  }

  handleAddItem(item: string) {
    this.items.push(item);
  }
}
