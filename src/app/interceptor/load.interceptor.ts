import { Injectable } from '@angular/core';
import { LoaderService } from './../../services/loader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
  constructor(private loaderService: LoaderService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /**
     * 忽略Loading Mask效果的API清單

     */
    // const ignoreApiList = [];
    let isIgnore = false;

    // ignoreApiList.forEach((apiKey) => {
    //   if (request.url.includes(apiKey)) {
    //     isIgnore = true;
    //   }
    // });

    if (isIgnore) {
      return next.handle(request);
    } else {
      this.loaderService.start();
      return next.handle(request).pipe(
        finalize(() => {
          this.loaderService.stop();
        })
      );
    }
  }



}
