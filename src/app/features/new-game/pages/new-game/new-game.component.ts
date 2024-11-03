import { Component } from '@angular/core';
import { AddItemComponent } from '../../components/add-item/add-item.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'new-game',
  standalone: true,
  imports: [AddItemComponent, ItemListComponent, PrimaryButtonComponent],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss',
})
export class NewGameComponent {}
