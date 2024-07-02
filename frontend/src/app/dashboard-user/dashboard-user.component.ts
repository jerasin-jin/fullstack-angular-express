import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DashboardUserService } from './dashboard-user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../interfaces';
import { ShareService } from '../share';

@Component({
  selector: 'app-users',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent implements OnInit {
  data = new BehaviorSubject<User[]>([]);
  countRoleAdmin = new BehaviorSubject<number>(0);
  countRoleUser = new BehaviorSubject<number>(0);
  countStatusInActive = new BehaviorSubject<number>(0);
  countStatusActive = new BehaviorSubject<number>(0);
  page: number = 1;
  size: number = 5;
  totalPage: number[];

  constructor(
    @Inject('DashboardUserService')
    private dashboardUserService: DashboardUserService,
    private activatedRoute: ActivatedRoute,
    @Inject('ShareService') private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (value: Params) => {
        this.fetchData(value);
      },
    });
  }

  private createRange(range: number) {
    const transactions = new Array(range).fill(0).map((n, index) => index + 1);
    this.totalPage = transactions;
  }

  private fetchData(pagination?: Params) {
    if (pagination?.page != null && pagination?.size != null) {
      this.page = Number(pagination?.page);
      this.size = Number(pagination?.size);
    }

    forkJoin({
      getUsers: this.dashboardUserService.getUsers(this.page, this.size),
      countRoleAdmin: this.dashboardUserService.countUserRole('admin'),
      countRoleUser: this.dashboardUserService.countUserRole('user'),
      countStatusInActive: this.dashboardUserService.countUserStatus(0),
      countStatusActive: this.dashboardUserService.countUserStatus(1),
    }).subscribe({
      next: ({
        getUsers,
        countRoleAdmin,
        countRoleUser,
        countStatusInActive,
        countStatusActive,
      }) => {
        const convertTimeZone = getUsers.data.map((i) => {
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
        this.data.next(convertTimeZone);
        this.createRange(getUsers.totalPage);
        this.countRoleAdmin.next(countRoleAdmin);
        this.countRoleUser.next(countRoleUser);
        this.countStatusActive.next(countStatusActive);
        this.countStatusInActive.next(countStatusInActive);
      },
      error: (err) => {
        if (err.status == 401) {
          this.shareService.signOut();
        }
      },
    });
  }

  public selectPageAndSize(page: number, size: number) {
    this.shareService.selectPageAndSize('dashboard/users', page, size);
  }
}
