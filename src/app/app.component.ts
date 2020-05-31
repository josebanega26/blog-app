import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { SpinnerService } from "./spinner/spinner.service";
import { delay } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = "blog-app";
  spinnerVisibility = false;
  constructor(private spinnerService: SpinnerService) {}
  ngOnInit() {}
  ngAfterViewChecked() {
    this.spinnerService.spinnerState.pipe(delay(0)).subscribe((state) => {
      this.spinnerVisibility = state;
    });
  }
}
