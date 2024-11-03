import { Component, Input } from '@angular/core';
import { Item } from '../../../../shared/types/items';

@Component({
  selector: 'item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  @Input() items = Array<string>();
}
