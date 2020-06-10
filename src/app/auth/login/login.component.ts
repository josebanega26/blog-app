import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
    });
  }
  submitForm() {
    console.log("this.signUpForm", this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe((res) => {
      console.log("res", res);
    });
  }
}
