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
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  login(user: IUser) {
    this.spinner.show();
    return this.http
      .post<{ token: string }>(`${environment.apiUrlUser}/login`, user)
      .subscribe(({ token }) => {
        this.spinner.hide();
        this.tokenService.setToken(token);
        this.tokenService.userState(true);
        this.router.navigate(["post"]);
      });
  }

  signUp(user: IUser) {
    this.spinner.show();
    return this.http.post(`${environment.apiUrlUser}/signup`, user);
  }
}
