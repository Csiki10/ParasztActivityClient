import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [PrimaryButtonComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {}
