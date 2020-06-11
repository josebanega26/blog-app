import { Component, OnInit } from "@angular/core";
import { TokenService } from "../core/services/token.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userIsConnect;
  constructor(private tokenService: TokenService, private route: Router) {}

  ngOnInit(): void {
    this.tokenService.authStatus.subscribe((state) => {
      this.userIsConnect = state;
    });
  }

  logout() {
    this.tokenService.setToken(null);
    this.tokenService.authStatus.next(false);
    this.route.navigate(["/"]);
  }
}
