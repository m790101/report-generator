import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey } from '@src/app/booking/enums/storage.enum';
import { StorageService } from '@src/services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = (this.storageService.get(StorageKey.ACCESS_TOKEN) as string) || '';

    // 判斷有無token
    if (token) {
      return next.handle(this.addToken(req, token));
    }
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { 'x-auth-token': token } });
  }
}
