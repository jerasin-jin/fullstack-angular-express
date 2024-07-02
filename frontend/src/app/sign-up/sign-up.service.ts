import { Inject, Injectable } from '@angular/core';
import { HttpService, Method } from '../https/http.service';
import { SignUpInterface, SignUpResponse } from 'src/interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    @Inject('HttpService')
    private httpService: HttpService
  ) {}

  signUp(props: SignUpInterface): Observable<SignUpResponse> {
    return this.httpService.fetch<any, SignUpResponse>(
      `${environment.apiUrl}/auth/register`,
      Method.POST,
      { props }
    );
  }
}
