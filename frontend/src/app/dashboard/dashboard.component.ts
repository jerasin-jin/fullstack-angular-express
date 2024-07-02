import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import {
  DashboardCount,
  Status,
  Transaction,
  SessionUser,
} from '../../interfaces';
import { DateTime } from 'luxon';
import { decodeToken } from '../../util';
import { ShareService } from '../share';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reports = new BehaviorSubject<Transaction[]>([]);
  email: string;
  showNavbarDashBoardReducer$: Observable<boolean>;
  count: DashboardCount;
  totalPage: number[];
  page = 1;
  size = 5;

  constructor(
    @Inject('DashboardService') private dashboardService: DashboardService,
    @Inject('ShareService') private shareService: ShareService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let tokenSessionUser: SessionUser = null;
    const getToken = localStorage.getItem('token');
    tokenSessionUser = decodeToken(getToken);
    this.email = tokenSessionUser.email;

    this.activatedRoute.queryParams.subscribe({
      next: (value: Params) => {
        this.fetchData(value);
      },
      error: (err) => {
        console.error('err', err);
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  private fetchData(pagination?: Params) {
    if (pagination?.page != null && pagination?.size != null) {
      this.page = Number(pagination?.page);
      this.size = Number(pagination?.size);
    }

    forkJoin({
      getTransactions: this.dashboardService.getTransactions(
        this.page,
        this.size
      ),
      getUserCount: this.dashboardService.getUserCount(),
      getProductCount: this.dashboardService.getProductCount(),
      getCategoryCount: this.dashboardService.getCategoryCount(),
      getTransactionCount: this.dashboardService.getTransactionCount(),
    }).subscribe({
      next: ({
        getTransactions,
        getUserCount,
        getProductCount,
        getCategoryCount,
        getTransactionCount,
      }) => {
        this.createRange(getTransactions.totalPage);
        this.count = {
          user: getUserCount,
          product: getProductCount,
          transaction: getTransactionCount,
          category: getCategoryCount,
        };
        const convertTimeZone = getTransactions.data.map((i) => {
          if (i.updatedAt == null) {
            return {
              ...i,
              createdAt: this.shareService.convertTimeZoneUtcToBkk(i.createdAt),
            };
          }
          return {
            ...i,
            createdAt: this.shareService.convertTimeZoneUtcToBkk(i.createdAt),
            updatedAt: this.shareService.convertTimeZoneUtcToBkk(i.updatedAt),
          };
        });
        console.log('convertTimeZone', convertTimeZone);
        this.reports.next(convertTimeZone);
      },
      error: (err) => {
        console.error('err', err);
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  private createRange(range: number) {
    const transactions = new Array(range).fill(0).map((n, index) => index + 1);
    this.totalPage = transactions;
  }

  public approveTransaction(transaction: Transaction) {
    transaction.status = Status.APPROVE;
    transaction.updatedAt = DateTime.utc().toISO();
    return this.dashboardService.updateTransaction(transaction).subscribe();
  }

  public rejectTransaction(transaction: Transaction) {
    transaction.status = Status.REJECT;
    transaction.updatedAt = DateTime.utc().toISO();
    return this.dashboardService.updateTransaction(transaction).subscribe();
  }

  public selectPageAndSize(page: number, size: number) {
    this.shareService.selectPageAndSize('dashboard', page, size);
  }
}
