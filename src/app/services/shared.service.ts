
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private localStorageChangeSubject = new Subject<void>();

  localStorageValueChanged() {
    this.localStorageChangeSubject.next();
  }

  get localStorageChange$() {
    return this.localStorageChangeSubject.asObservable();
  }
}