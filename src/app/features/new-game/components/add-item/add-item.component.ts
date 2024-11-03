import { Component, EventEmitter, output, Output } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  item = new FormControl('');
  onAddItem = output<string>();

  addItem(word: string): void {
    if (word.trim() !== '') {
      this.item.setValue(word.trim());
    }
    this.onAddItem.emit(this.item.value ?? '');
  }

  isDisabled() {
    // todo not works
    return !this.item.value;
  }
}
