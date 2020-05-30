import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner/spinner.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "blog-app";
  spinnerVisibility = false;
  constructor(private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.spinnerState.subscribe((state) => {
      this.spinnerVisibility = state;
    });
  }
}
