import { environment } from '@src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { ErrorRes } from '@src/model/error-res';

export abstract class BaseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  protected get<T>(postData: object | Array<any> = {}, prefixPath: string): Observable<T> {
    const fullUrl = `${this.apiUrl}/${prefixPath}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams();

    return this.http.get<T>(fullUrl, { headers, params }).pipe(catchError((error) => throwError(error)));
  }

  protected post<T>(postData: object | Array<any> = {}, prefixPath: string): Observable<T> {
    const fullUrl = `${this.apiUrl}/${prefixPath}`;
    return this.http.post<T>(fullUrl, postData).pipe(catchError((error) => throwError(error)));
  }

  protected postImage<T>(postData: object | Array<any> = {}, prefixPath: string): Observable<any> {
    const fullUrl = `${this.apiUrl}/${prefixPath}`;

    return this.http.post(fullUrl, postData, { responseType: 'blob', observe: 'response' }).pipe(
      catchError((error) => throwError(error)),
      concatMap((res: any) => this.handBlobError(res))
    );
  }

  protected download<T>(postData: object | Array<any> = {}, prefixPath: string): Observable<any> {
    const fullUrl = `${this.apiUrl}/${prefixPath}`;
    const option = { responseType: 'blob' as 'json' };
    return this.http.post<T>(fullUrl, postData, option).pipe(
      catchError((error) => throwError(error)),
      concatMap((res: any) => this.handBlobError(res))
    );
  }

  protected postFiles<T>(postData: object = {}, prefixPath: string): Observable<any> {
    const fullUrl = `${this.apiUrl}/${prefixPath}`;
    const formData = new FormData();

    Object.entries(postData).forEach((item) => {
      const [key, value] = item;
      if (value instanceof Array && value.length > 0) {
        if (value[0] instanceof File) {
          value.forEach((valueItem) => {
            formData.append(`${key}[]`, valueItem);
          });
        } else {
          value.forEach((valueItem, index) => {
            this.appendParam(formData, key, index, valueItem);
          });
        }
      } else {
        if (value) {
          formData.append(key, value);
        }
      }
    });

    return this.http.post<T>(fullUrl, formData).pipe(catchError((error) => throwError(error)));
  }

  /**
   * formData 多層Array, Object 遞歸匯入
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected appendParam(formData: FormData, parentKey: string, parentIndex: number, valueItem: any): void {
    for (const [paramsKey, paramValue] of Object.entries(valueItem)) {
      if (paramValue && paramValue instanceof Array && paramValue.length > 0) {
        if (paramValue[0] instanceof File) {
          paramValue.forEach((subParamValueItem) => {
            formData.append(`${parentKey}[${parentIndex}].${paramsKey}[]`, subParamValueItem);
          });
        } else {
          paramValue.forEach((subParamValueItem, subParamValueIndex) => {
            const subParentParamKey = `${parentKey}[${parentIndex}].${paramsKey}`;
            this.appendParam(formData, subParentParamKey, subParamValueIndex, subParamValueItem);
          });
        }
      } else {
        if (paramValue && paramValue instanceof File) {
          formData.append(`${parentKey}[${parentIndex}].${paramsKey}`, paramValue);
        } else {
          const paramValueStr = paramValue !== null ? (paramValue as string) : null;
          if (paramValueStr) {
            formData.append(`${parentKey}[${parentIndex}].${paramsKey}`, paramValueStr);
          }
        }
      }
    }
  }

  // 判斷Blob結果並轉換為ErrorRes或回傳blob
  private handBlobError(res: Blob): Promise<ErrorRes> | Promise<Blob> {
    if (res instanceof Blob && res.type === 'application/json') {
      const blob: Blob = new Blob([res], { type: 'application/json' });
      return new Promise<ErrorRes>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(blob, 'utf-8');
        reader.onload = () => {
          if (reader.result instanceof String || reader.result?.constructor.name === 'String') {
            resolve(JSON.parse(reader.result as string));
          } else {
            reject(res);
          }
        };
      });
    } else {
      return new Promise<Blob>((resolve) => {
        resolve(res);
      });
    }
  }
}
