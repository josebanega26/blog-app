import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner/spinner.service";
import { delay } from "rxjs/operators";
import { AuthService } from "@auth/auth.service";
import { SwUpdate } from "@angular/service-worker";
SwUpdate;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "blog-app";
  spinnerVisibility = false;
  constructor(
    private spinnerService: SpinnerService,
    private auth: AuthService,
    private swUpdate: SwUpdate
  ) {}
  ngOnInit() {
    this.auth.autoAuthUser();
    this.spinnerService.spinnerState.pipe(delay(0)).subscribe((state) => {
      this.spinnerVisibility = state;
    });
    this.updatePWA();
  }

  updatePWA() {
    this.swUpdate.available.subscribe((value) => {
      window.location.reload();
    });
  }
}
