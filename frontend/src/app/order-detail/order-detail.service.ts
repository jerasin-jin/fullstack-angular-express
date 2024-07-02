import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces/order.interface';

@Injectable()
export class OrderDetailService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getSaleOrderById(orderId: string): Observable<Order[]> {
    return this.httpService.fetch<any, Order[]>(
      `${environment.apiUrl}/saleOrder/saleOrderId/${orderId}`
    );
  }
}
