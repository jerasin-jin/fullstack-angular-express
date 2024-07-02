import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../../interfaces';
import { ProductListService } from './product-list.service';
import jwt_decode from 'jwt-decode';
import { ParamMap, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';
import { SelectItem } from '../navbar/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseTypeOption, Pagination } from '../../interfaces/base.interface';
import { ShareService } from '../share';
import { Store } from '@ngrx/store';
import { setSelectItem } from '../store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../app.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  result: Product[] = [];
  role: string | undefined;
  selectItem: SelectItem[] = [];
  itemIdFromRoute: BaseTypeOption = null;
  selectPage: number;
  selectSize: number;
  totalPage: number;
  @ViewChild('btn-page', { read: ElementRef })
  paginationBtn?: ElementRef<HTMLDivElement>;

  constructor(
    @Inject('ProductListService')
    private productListService: ProductListService,
    private activatedRoute: ActivatedRoute,
    @Inject('ShareService') private shareService: ShareService,
    private store: Store<{ selectItemReducer: SelectItem[] }>
  ) {}

  public createRange(range: number) {
    return new Array(range).fill(0).map((n, index) => index + 1);
  }

  ngOnInit(): void {
    this.store.select('selectItemReducer').subscribe({
      next: (value) => {
        // https://stackoverflow.com/questions/68671805/cannot-assign-to-read-only-property-selected-of-object-object-object
        this.selectItem = value.map((item) => ({ ...item }));
      },
    });

    const routeParams: ParamMap = this.activatedRoute.snapshot.paramMap;
    this.selectPage = 1;
    this.selectSize = 5;

    this.activatedRoute.queryParams.subscribe({
      next: (value: Params) => {
        this.fetchProduct(routeParams, value);
      },
    });

    const token = localStorage.getItem('token');

    if (token != null) {
      const decoded = jwt_decode(token) as Record<string, any>;
      this.role = decoded['role'];
    }
  }

  private fetchProduct(routeParams?: ParamMap, pagination?: Params) {
    console.log('fetchProduct');
    if (pagination?.page != null) {
      this.selectPage = Number(pagination?.page);
    }

    if (pagination?.size != null) {
      this.selectSize = Number(pagination?.size);
    }

    if (routeParams != null) {
      if (routeParams.get('categoryId') != null) {
        this.itemIdFromRoute = {
          categoryId: Number(routeParams.get('categoryId')),
        };
      } else if (routeParams.get('productId') != null) {
        this.itemIdFromRoute = {
          productId: Number(routeParams.get('productId')),
        };
      }
    }

    forkJoin({
      getProducts: this.calculateRedirectProductPage(
        this.selectPage,
        this.selectSize,
        this.itemIdFromRoute
      ),
      getWareHouses: this.productListService.getWareHouses(),
    }).subscribe({
      next: ({ getProducts, getWareHouses }) => {
        this.totalPage = getProducts.totalPage;
        this.products = getProducts.data.map((product: Product) => {
          const findWareHouse = getWareHouses.find(
            (value: any) => value.productId == product.id
          );
          return {
            ...product,
            img:
              product.img != null
                ? `${environment.apiUrl}/images/${product.img}?${Date.now()}`
                : '/assets/images/noImage.jpg',
            available: findWareHouse?.amount,
          };
        });
      },
      error: (err) => {
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  public setShoppingCar(value: Product) {
    const findItem = this.selectItem.findIndex((e) => e.productId == value.id);

    if (findItem == -1) {
      this.selectItem.push({
        productId: value.id,
        amount: 1,
        name: value.name,
        price: value.price,
      });
    } else {
      this.selectItem[findItem]['amount'] += 1;
    }

    localStorage.setItem('shopping', JSON.stringify(this.selectItem));
    this.store.dispatch(setSelectItem({ session: this.selectItem }));
  }

  private calculateRedirectProductPage(
    page: number,
    size: number,
    options?: BaseTypeOption
  ): Observable<Pagination<Product[]>> {
    if (options?.categoryId != null) {
      return this.productListService.getProductByCategory(options.categoryId);
    } else if (options?.productId != null) {
      return this.productListService.getProductById(options.productId);
    } else {
      return this.productListService.getProducts(page, size);
    }
  }

  public selectPageAndSize(page: number, size: number) {
    this.shareService.selectPageAndSize('products', page, size);
  }
}
