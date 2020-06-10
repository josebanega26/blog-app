import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface IUser {
  email: string;
  password: string;
}
@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: IUser) {
    console.log("login", user);
    return this.http.post(`${environment.apiUrlUser}/login`, user);
  }

  signUp(user: IUser) {
    console.log("Sign up", user);
    return this.http.post(`${environment.apiUrlUser}/signup`, user);
  }
}
