import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({ providedIn: "root" })
export class SpinnerService {
  constructor() {}
  spinnerState: Subject<boolean> = new Subject();

  hide() {
    this.spinnerState.next(false);
  }

  show() {
    this.spinnerState.next(true);
  }
}
