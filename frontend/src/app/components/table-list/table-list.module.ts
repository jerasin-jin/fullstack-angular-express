import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TableListComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [TableListComponent],
})
export class TableListModule {}
