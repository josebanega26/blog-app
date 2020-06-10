import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private token: string;

  constructor() {}

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
