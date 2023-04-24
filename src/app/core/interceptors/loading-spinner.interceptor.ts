import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, delay, Observable, tap } from 'rxjs';
import { CoreService } from '../services/core.service';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly coreService: CoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.coreService.setSpinnerState(true);
    return next.handle(request).pipe(
      delay(2000),
      tap(() => {
        this.coreService.setSpinnerState(false);
      }),
      catchError((err) => {
        this.coreService.setSpinnerState(false);
        throw err;
      })
    );
  }
}
