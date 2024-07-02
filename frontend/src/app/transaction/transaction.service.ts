import { Injectable, Inject } from '@angular/core';
import {
  Transaction,
  TransactionProps,
} from '../../interfaces/transaction.interface';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TransactionService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public createTransaction(value: TransactionProps): Observable<Transaction> {
    return this.httpService.fetch(
      `${environment.apiUrl}/transactions`,
      Method.POST,
      { props: value }
    );
  }
}
