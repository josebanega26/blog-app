import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  private token: string;
  private userId: string;
  authStatus = new Subject<boolean>();

  constructor() {}

  setToken(token) {
    if (token) {
      console.log("tou are here");
      this.token = token;
      this.authStatus.next(true);
    } else {
      this.authStatus.next(false);
    }
  }

  saveLocalData(token: string, expirationDate: Date) {
    console.log("expirationDate", expirationDate);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
  }
  getLocalData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if (!token || !expirationDate) {
      return null;
    }
    return { token, expirationDate: new Date(expirationDate) };
  }
  cleanLocalData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    this.authStatus.next(false);
  }

  getToken() {
    return this.token;
  }
  getIsAuth() {
    if (this.token) {
      return true;
    }
    return false;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }
}
