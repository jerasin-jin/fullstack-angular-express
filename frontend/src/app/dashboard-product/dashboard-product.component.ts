import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Product } from '../../interfaces';
import { DashboardProductService } from './dashboard-product.service';
import { ShareService } from '../share';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css'],
})
export class DashboardProductComponent implements OnInit {
  data = new BehaviorSubject<Product[]>([]);
  page: number = 1;
  size: number = 5;
  totalPage: number[];
  countActive: number = 0;
  countInActive: number = 0;
  total: number = 0;
  countWarning = 0;

  constructor(
    @Inject('DashboardProductService')
    private dashboardProductService: DashboardProductService,
    @Inject('ShareService') private shareService: ShareService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (value: Params) => {
        this.fetchData(value);
      },
      error: (err) => {
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  public fetchData(pagination?: Params) {
    if (pagination?.page != null && pagination?.size != null) {
      this.page = Number(pagination?.page);
      this.size = Number(pagination?.size);
    }

    forkJoin({
      getProducts: this.dashboardProductService.getProducts(
        this.page,
        this.size
      ),
      countProductActiveStatus:
        this.dashboardProductService.countProductStatus(1),
      countProductInActiveStatus:
        this.dashboardProductService.countProductStatus(0),
      getWareHouses: this.dashboardProductService.getWareHouses(),
      getWarningAmountWareHouses:
        this.dashboardProductService.countWareHouses(0),
    }).subscribe({
      next: ({
        getProducts,
        countProductActiveStatus,
        countProductInActiveStatus,
        getWareHouses,
        getWarningAmountWareHouses,
      }) => {
        this.countWarning = getWarningAmountWareHouses;

        console.log('getProducts', getProducts);

        this.total = getProducts.total;
        const convertTimeZone = getProducts.data.map((i) => {
          const findWareHouse = getWareHouses.find(
            (value: any) => value.productId == i.id
          );

          // if (findWareHouse == null) {
          //   return {
          //     ...i,
          //     createdAt: this.shareService.convertTimeZoneUtcToBkk(i.createdAt),
          //     available: findWareHouse?.amount ?? 0,
          //     status: false,
          //   };
          // }

          if (i.updatedAt == null) {
            return {
              ...i,
              createdAt: this.shareService.convertTimeZoneUtcToBkk(i.createdAt),
              available: findWareHouse?.amount ?? 0,
            };
          }
          return {
            ...i,
            createdAt: this.shareService.convertTimeZoneUtcToBkk(i.createdAt),
            updatedAt: this.shareService.convertTimeZoneUtcToBkk(i.updatedAt),
            available: findWareHouse?.amount,
          };
        });

        this.totalPage = this.shareService.createRange(getProducts.totalPage);

        console.log('convertTimeZone', convertTimeZone.length);
        this.data.next(convertTimeZone);
        this.countActive = countProductActiveStatus;
        this.countInActive = countProductInActiveStatus;
      },
    });
  }

  public selectPageAndSize(page: number, size: number) {
    this.shareService.selectPageAndSize('dashboard/products', page, size);
  }
}
