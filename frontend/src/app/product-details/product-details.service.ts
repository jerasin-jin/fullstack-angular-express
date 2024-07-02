import { Injectable, Inject } from '@angular/core';
import { Product } from '../../interfaces';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDetailService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getProduct(id: number): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${id}`,
      Method.GET
    );
  }

  public updateProduct(props: Partial<Product>): Observable<any> {
    return this.httpService.fetch(
      `http://localhost:3000/products/${props.id}`,
      Method.PUT,
      { props }
    );
  }

  public uploadImage(source: FormData) {
    return this.httpService.fetch(`http://localhost:3000/upload`, Method.POST, {
      props: source,
    });
  }
}
