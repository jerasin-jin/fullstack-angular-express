import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../https/http.service';
import { Category } from '../../interfaces/category.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pagination } from '../../interfaces';

@Injectable()
export class CategoryService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getCategory(page = 1, size = 5): Observable<Pagination<Category[]>> {
    return this.httpService.fetch<any, Pagination<Category[]>>(
      `${environment.apiUrl}/categories?page=${page}&size=${size}`
    );
  }
}
