import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenService } from "../core/services/token.service";
import { Router } from "@angular/router";
import { SpinnerService } from "../spinner/spinner.service";

export interface IUser {
  email: string;
  password: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  tokenTimer: any;
  userId: string;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  login(user: IUser) {
    this.spinner.show();
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${environment.apiUrlUser}/login`,
        user
      )
      .subscribe(
        ({ token, expiresIn, userId }) => {
          this.spinner.hide();
          this.userId = userId;
          this.tokenTimer;
          this.tokenService.setToken(token);
          this.setAutLogout(expiresIn);
          const currentDate = new Date();
          const expirationDate = new Date(
            currentDate.getTime() + expiresIn * 1000
          );
          this.tokenService.saveLocalData(token, expirationDate);
          this.router.navigate(["post"]);
        },
        (error) => {
          this.handlerError(error);
        }
      );
  }
  autoAuthUser() {
    const authInformation = this.tokenService.getLocalData();
    if (!authInformation) {
      return;
    }
    const currentTime = new Date();
    const isInFuture =
      authInformation.expirationDate.getTime() - currentTime.getTime();
    if (isInFuture > 0) {
      this.tokenService.setToken(authInformation.token);
      this.setAutLogout(isInFuture / 1000);
      this.router.navigate(["/post"]);
    }
  }
  setAutLogout(expiresIn: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  signUp(user: IUser) {
    this.spinner.show();
    return this.http
      .post(`${environment.apiUrlUser}/signup`, user)
      .subscribe((msg) => {
        this.spinner.hide();
        this.router.navigate(["/"]);
      });
  }

  handlerError(error) {
    this.spinner.hide();
    console.error(error);
  }

  logout() {
    this.tokenService.setToken(null);
    clearTimeout(this.tokenTimer);
    this.tokenService.cleanLocalData();
    this.router.navigate(["/"]);
  }
}
