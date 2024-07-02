import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
}

export interface Options<T> {
  props: T;
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  fetch<I, O>(
    path: string,
    method = Method.GET,
    options?: Options<I>
  ): Observable<O> {
    let http = null;

    switch (method) {
      case Method.GET:
        http = this.http.get<O>(path);
        break;
      case Method.POST:
        http = this.http.post<O>(path, options?.props);
        break;
      case Method.PUT:
        http = this.http.put<O>(path, options?.props);
        break;
    }

    return http;
  }
}
