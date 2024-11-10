import {
  Component,
  ElementRef,
  EventEmitter,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-item',
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  @ViewChild('word') itemElement: ElementRef | undefined;

  item = new FormControl('', [Validators.required, Validators.minLength(2)]);
  onAddItem = output<string>();

  addItem() {
    this.onAddItem.emit(this.item.value!);
    this.item.reset();
    this.itemElement?.nativeElement.focus();
  }
}
