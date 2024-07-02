import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../../interfaces/category.interface';
import { environment } from '../../environments/environment';
import { ShareService } from '../share';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  totalPage: number[];
  page = 1;
  size = 5;

  constructor(
    @Inject('CategoryService') private categoryService: CategoryService,
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

    this.categoryService.getCategory(this.page, this.size).subscribe({
      next: (value) => {
        this.totalPage = this.shareService.createRange(value.totalPage);
        this.categories = value.data.map((item) => {
          return {
            ...item,
            img:
              item.img != null
                ? `${environment.apiUrl}/images/${item.img}?${Date.now()}`
                : '/assets/images/noImage.jpg',
          };
        });
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
    this.shareService.selectPageAndSize('category', page, size);
  }
}
