import { Injectable } from '@angular/core';
import { StorageKey } from '@src/app/booking/enums/storage.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public storageKey = StorageKey;
  private storage: Storage;
  private localStorage: Storage;
  private subjects: Map<string, BehaviorSubject<any>>;

  constructor() {
    this.storage = window.sessionStorage;
    this.localStorage = window.localStorage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }

  /**
   * watch data of given key
   *
   * @param key session storage的key
   */
  watch<T>(key: StorageKey): Observable<T | null> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<T | null>(null));
    }
    let item: string | null = this.storage.getItem(key);

    if (item !== null) {
      item = JSON.parse(item as string);
    }

    this.subjects.get(key)?.next(item);
    return (this.subjects.get(key) as BehaviorSubject<T>).asObservable();
  }

  /**
   * get data of given key
   *
   * @param key 要取值的key
   */
  get<T>(key: StorageKey): T | null {
    const item: string | null = this.storage.getItem(key);
    if (item === null) {
      return null;
    } else {
      return JSON.parse(item as string);
    }
  }

  /**
   * set value on given key
   *
   * @param key sorage 的 key
   * @param value 要寫入得值
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  set(key: StorageKey, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(value));
    } else {
      this.subjects.get(key)?.next(value);
    }
  }

  /**
   * remove given key
   *
   * @param key 要移除資料的key
   */
  remove(key: StorageKey): void {
    if (this.subjects.has(key)) {
      this.subjects.get(key)?.complete();
      this.subjects.delete(key);
    }
    this.storage.removeItem(key);
  }

  /**
   * get data of given key
   *
   * @param key 要取值的key
   */
  getLocalStorageItem<T>(key: StorageKey): T | null {
    const item: string | null = this.localStorage.getItem(key);
    if (item === null) {
      return null;
    } else {
      return JSON.parse(item as string);
    }
  }

  /**
   * set value on given key
   *
   * @param key sorage 的 key
   * @param value 要寫入得值
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setLocalStorageItem(key: StorageKey, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(value));
    } else {
      this.subjects.get(key)?.next(value);
    }
  }

  /**
   * remove given key
   *
   * @param key 要移除資料的key
   */
  removeLocalStorageItem(key: StorageKey): void {
    if (this.subjects.has(key)) {
      this.subjects.get(key)?.complete();
      this.subjects.delete(key);
    }
    this.localStorage.removeItem(key);
  }

  /**
   * clear all available keys
   */
  clear(): void {
    this.subjects.clear();
    this.storage.clear();
    this.localStorage.clear();
  }
}

