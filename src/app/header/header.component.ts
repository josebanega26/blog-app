import { Component, OnInit } from "@angular/core";
import { TokenService } from "../core/services/token.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userIsConnect;
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.authStatus.subscribe((state) => {
      this.userIsConnect = state;
    });
  }
}
