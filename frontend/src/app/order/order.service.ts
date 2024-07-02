import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Order, OrderProps } from '../../interfaces/order.interface';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { WareHouseProps } from '../../interfaces/warehouse.interface';

@Injectable()
export class OrderService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public createSaleOrder(value: OrderProps): Observable<Order> {
    return this.httpService.fetch(
      `${environment.apiUrl}/saleOrder`,
      Method.POST,
      { props: value }
    );
  }

  public updateWareHouse(value: WareHouseProps) {
    return this.httpService.fetch(
      `${environment.apiUrl}/wareHouse/updateAmount/${value.productId}`,
      Method.PUT,
      { props: value }
    );
  }
}
