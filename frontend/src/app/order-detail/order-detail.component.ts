import { Component, Inject, OnInit } from '@angular/core';
import { OrderDetailService } from './order-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../../interfaces/order.interface';
import { ShareService } from '../share';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  data: Order[];
  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject('OrderDetailService')
    private orderDetailService: OrderDetailService,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  backClicked() {
    this.shareService.backClicked();
  }

  ngOnInit(): void {
    this.getSaleOrderById().subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (err) => {
        if (err?.status == 401) {
          this.shareService.tokenRedirectExpire();
          return;
        }

        throw err;
      },
    });
  }

  public getSaleOrderById(): Observable<Order[]> {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('orderId');

    return this.orderDetailService.getSaleOrderById(productIdFromRoute);
  }
}
