import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductForm } from '../../../interfaces';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent implements OnInit {
  @Input() header!: string;
  @Input() eleInput: ProductForm[] = [];
  @Input() form!: FormGroup;
  @Output() childFormSubmitted: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('ItemFormComponent init', this.eleInput);
  }

  async onSubmit() {
    if (this.form.valid == false) {
    }
    console.log('this.form.valid', this.form.valid);
    this.childFormSubmitted.emit(this.form.value);
  }
}
