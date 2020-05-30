import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: "root" })
export class SpinnerService {
  constructor() {}
  spinnerState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  hide() {
    this.spinnerState.next(false);
  }

  show() {
    this.spinnerState.next(true);
  }
}
