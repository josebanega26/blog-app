import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private token: string;
  authStatus = new Subject<boolean>();

  constructor() {}

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  userState(state: boolean) {
    this.authStatus.next(state);
  }
}
