import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from './transaction.service';

const TransactionServiceProvider: Provider = {
  provide: 'TransactionService',
  useClass: TransactionService,
};

@NgModule({
  declarations: [],
  providers: [TransactionServiceProvider],
  imports: [CommonModule],
})
export class TransactionModule {}
