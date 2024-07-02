import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Pagination, Product } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardProductService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getProducts(page = 1, size = 5): Observable<Pagination<Product[]>> {
    return this.httpService.fetch<any, Pagination<Product[]>>(
      `${environment.apiUrl}/products?page=${page}&size=${size}`
    );
  }

  public countProductStatus(active: number) {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/products/count?status=${active}`
    );
  }

  getWareHouses(): Observable<any> {
    return this.httpService.fetch('http://localhost:3000/wareHouse');
  }

  countWareHouses(amount?: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/wareHouse/count?amount=${amount}`
    );
  }
}
