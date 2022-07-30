import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HandleErrors implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.body.status === 'failed') {
          let error = event.body.message || event.body.messages || null;
          let errors = [];
          if (typeof error === 'object') {
            for (let err in error) {
              errors.push(...error[err]);
            }
          }
          throw new HttpErrorResponse({
            error: errors.length ? errors : error,
          });
        }
      })
    );
  }
}
