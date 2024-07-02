import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Category, Pagination } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardCategoryService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getCategories(page = 1, size = 5): Observable<Pagination<Category[]>> {
    return this.httpService.fetch<any, Pagination<Category[]>>(
      `${environment.apiUrl}/categories?page=${page}&size=${size}`
    );
  }

  public countCategoryStatus(active: number) {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/categories/count?status=${active}`
    );
  }
}
