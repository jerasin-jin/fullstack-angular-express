import { Inject, Injectable } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Product, WareHouseProps } from '../../interfaces';
import { ShareService } from '../share';
import { Observable } from 'rxjs';

@Injectable()
export class DbProductCreateService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  public createProduct(data: Product): Observable<any> {
    return this.httpService.fetch(
      `${environment.apiUrl}/products`,
      Method.POST,
      {
        props: data,
      }
    );
  }

  public getCategories(): Observable<any> {
    return this.httpService.fetch(`${environment.apiUrl}/categories/all`);
  }

  public createWareHouse(data: WareHouseProps) {
    return this.httpService.fetch(
      `${environment.apiUrl}/wareHouse`,
      Method.POST,
      {
        props: data,
      }
    );
  }
}
