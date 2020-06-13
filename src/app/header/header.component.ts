import { Component, OnInit } from "@angular/core";
import { TokenService } from "../core/services/token.service";
import { AuthService } from "@auth/auth.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userIsConnect;
  constructor(private tokenService: TokenService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userIsConnect = this.tokenService.getIsAuth();
    this.tokenService.authStatus.subscribe((state) => {
      console.log("state HEEEEY", state);
      this.userIsConnect = state;
    });
  }

  logout() {
    this.auth.logout();
  }
}
