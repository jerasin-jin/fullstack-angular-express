import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../https/http.service';
import { Pagination, User } from '../../interfaces';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardUserService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getUsers(page = 1, size = 5) {
    return this.httpService.fetch<any, Pagination<User[]>>(
      `${environment.apiUrl}/users?page=${page}&size=${size}`
    );
  }

  public countUserRole(role: string) {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/users/count?role=${role}`
    );
  }

  public countUserStatus(active: number) {
    return this.httpService.fetch<any, number>(
      `${environment.apiUrl}/users/count?status=${active}`
    );
  }
}
