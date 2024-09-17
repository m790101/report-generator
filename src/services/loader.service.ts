import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";




@Injectable({
  providedIn: 'root',
})

export class LoaderService{
  private loaderCounter = 0;
  private loadingStatus$ :BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);

  get loading$():Observable<boolean>{
    return this.loadingStatus$.asObservable();
  }

  start(): void {
    this.loaderCounter++;

    if (this.loaderCounter > 0) {
      this.loadingStatus$.next(true);
    }
  }

  stop(): void {
    if (this.loaderCounter > 0) {
      this.loaderCounter--;
    }

    if (this.loaderCounter <= 0) {
      this.loadingStatus$.next(false);
    }
  }


}
