import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public spinnerState$: BehaviorSubject<boolean>;

  constructor() {
    this.spinnerState$ = new BehaviorSubject<boolean>(false);
  }

  public setSpinnerState(state: boolean): void {
    this.spinnerState$.next(state);
  }

  public getSpinnerState(): boolean {
    return this.spinnerState$.getValue();
  }
}
