import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../../interfaces';

@Injectable()
export class HistoryService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getTransactionsByCreated(userId: number): Observable<Transaction[]> {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transactions/history/${userId}`
    );
  }
}
