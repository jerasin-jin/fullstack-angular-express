import { Injectable, Inject } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject('HttpService') private httpService: HttpService) {}

  public getUser(id: number): Observable<User> {
    return this.httpService.fetch<any, User>(
      `http://localhost:3000/users/${id}`,
      Method.GET
    );
  }

  public updateUser(id: number, data: Record<string, any>): Observable<User> {
    return this.httpService.fetch<Record<string, any>, User>(
      `http://localhost:3000/users/${id}`,
      Method.PUT,
      { props: data }
    );
  }
}
