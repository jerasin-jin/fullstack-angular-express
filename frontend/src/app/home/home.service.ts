import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../https/http.service';
import { Product } from '../../interfaces';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from '../../interfaces';

@Injectable()
export class HomeService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getSuggestProduct(): Observable<Pagination<Product[]>> {
    return this.httpService.fetch<any, Pagination<Product[]>>(
      `${environment.apiUrl}/products/productSuggest`
    );
  }
}
