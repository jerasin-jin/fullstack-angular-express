import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Pagination, Transaction } from '../../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getTransactions(
    page = 1,
    size = 5
  ): Observable<Pagination<Transaction[]>> {
    return this.httpService.fetch<any, Pagination<Transaction[]>>(
      `${environment.apiUrl}/transactions?page=${page}&size=${size}`
    );
  }

  public updateTransaction(transaction: Transaction) {
    return this.httpService.fetch<any, Transaction[]>(
      `${environment.apiUrl}/transactions/${transaction.id}`,
      Method.PUT,
      { props: transaction }
    );
  }

  public getUserCount(): Observable<number> {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/users/count`
    );
  }

  public getProductCount(): Observable<number> {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/products/count`
    );
  }

  public getCategoryCount(): Observable<number> {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/categories/count`
    );
  }

  public getTransactionCount(): Observable<number> {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/transactions/count`
    );
  }
}
