import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TokenService } from "../core/services/token.service";

export interface IUser {
  email: string;
  password: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: IUser) {
    return this.http
      .post<{ token: string }>(`${environment.apiUrlUser}/login`, user)
      .subscribe(({ token }) => {
        this.tokenService.setToken(token);
      });
  }

  signUp(user: IUser) {
    return this.http.post(`${environment.apiUrlUser}/signup`, user);
  }
}
