import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ShareService } from '../share';
import { DashboardCategoryService } from './dashboard-category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Category } from 'src/interfaces';

@Component({
  selector: 'app-dashboard-category',
  templateUrl: './dashboard-category.component.html',
  styleUrls: ['./dashboard-category.component.css'],
})
export class DashboardCategoryComponent implements OnInit {
  data = new BehaviorSubject<Category[]>([]);
  page: number = 1;
  size: number = 5;
  totalPage: number[];
  countActive: number = 0;
  countInActive: number = 0;
  total: number = 0;

  constructor(
    @Inject('DashboardCategoryService')
    private dashboardCategoryService: DashboardCategoryService,
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
      getCategories: this.dashboardCategoryService.getCategories(
        this.page,
        this.size
      ),
      countCategoryActiveStatus:
        this.dashboardCategoryService.countCategoryStatus(1),
      countCategoryInActiveStatus:
        this.dashboardCategoryService.countCategoryStatus(0),
    }).subscribe({
      next: ({
        getCategories,
        countCategoryActiveStatus,
        countCategoryInActiveStatus,
      }) => {
        this.total = getCategories.total;
        this.totalPage = this.shareService.createRange(getCategories.totalPage);
        const resources = getCategories.data.map((item) => {
          if (item?.updatedAt == null) {
            return {
              ...item,
              createdAt: this.shareService.convertTimeZoneUtcToBkk(
                item.createdAt
              ),
              img:
                item.img != null
                  ? `${environment.apiUrl}/images/${item.img}?${Date.now()}`
                  : '/assets/images/noImage.jpg',
            };
          }
          return {
            ...item,
            createdAt: this.shareService.convertTimeZoneUtcToBkk(
              item.createdAt
            ),
            updatedAt: this.shareService.convertTimeZoneUtcToBkk(
              item.updatedAt
            ),
          };
        });
        this.data.next(resources);
        this.countActive = countCategoryActiveStatus;
        this.countInActive = countCategoryInActiveStatus;
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

  public selectPageAndSize(page: number, size: number) {
    this.shareService.selectPageAndSize('dashboard/categories', page, size);
  }
}
