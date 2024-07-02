import { Inject, Injectable } from '@angular/core';
import { SignInInterface, SignInResponse } from '../../interfaces';
import { HttpService, Method } from '../https/http.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SignInService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService
  ) {}

  signIn(props: SignInInterface): Observable<SignInResponse> {
    return this.httpService.fetch<any, SignInResponse>(
      `${environment.apiUrl}/auth/login`,
      Method.POST,
      { props }
    );
  }
}
