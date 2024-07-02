import { Inject, Injectable } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';
import { Pagination, Product } from '../../interfaces';
@Injectable()
export class ProductListService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  getProducts(page = 1, size = 5): Observable<Pagination<Product[]>> {
    return this.httpService.fetch(
      `http://localhost:3000/products?page=${page}&size=${size}&status=true`,
      Method.GET
    );
  }

  getProductById(id: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${id}`,
      Method.GET
    );
  }

  getProductByCategory(id: number, page = 1, size = 5): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/category/${id}?page=${page}&size=${size}`,
      Method.GET
    );
  }

  getWareHouses(): Observable<any> {
    return this.httpService.fetch(
      'http://localhost:3000/wareHouse',
      Method.GET
    );
  }
}
