import { environment } from '@env';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageKey } from '@src/app/booking/enums/storage.enum';
import { StorageService } from '@src/services/storage.service';

@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        this.setToken(event);
        // dev api log
        // if (!environment.production) {
        //   this.apiLog(req, event);
        // }
      })
    );
  }

  /**
   * 將回傳token存入localstorage
   */
  private setToken(event: HttpEvent<any>): void {
    if (!(event instanceof HttpResponse)) {
      return;
    }
    const token = event?.headers.get('X-Auth-Token');

    if (token) {
      this.storageService.set(StorageKey.ACCESS_TOKEN, token);
    }
  }

}
