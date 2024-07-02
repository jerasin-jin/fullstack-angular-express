import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ItemFormComponent],
})
export class ItemFormModule {}
