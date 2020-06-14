import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "./spinner/spinner.service";
import { delay } from "rxjs/operators";
import { AuthService } from "@auth/auth.service";
import { Title, Meta } from "@angular/platform-browser";
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
    private titleService: Title,
    private metaTagService: Meta
  ) {}
  ngOnInit() {
    this.titleService.setTitle("Space Blog");
    this.metaTagService.updateTag({
      name: "description",
      content:
        "This blog is a MEAN project to make better my skills as fullstack developer",
    });
    //TODO: Make Other top-level components do this so the above content doesn't get stuck there!
    this.auth.autoAuthUser();
    this.spinnerService.spinnerState.pipe(delay(0)).subscribe((state) => {
      this.spinnerVisibility = state;
    });
  }
}
