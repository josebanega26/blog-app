import { Component, OnInit, HostListener } from "@angular/core";
import { TokenService } from "../core/services/token.service";
import { AuthService } from "@auth/auth.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  installEvent = null;
  userIsConnect;
  constructor(private tokenService: TokenService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userIsConnect = this.tokenService.getIsAuth();
    this.tokenService.authStatus.subscribe((state) => {
      this.userIsConnect = state;
    });
  }
  @HostListener("window:beforeinstallprompt", ["$event"])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser() {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice().then((res) => {});
    }
  }

  logout() {
    this.auth.logout();
  }
}
