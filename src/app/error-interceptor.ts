import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "./error/error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private matDialog: MatDialog) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error.message", error.error.message);
        let message = "A unkow error has ocurred";
        if (error.error.message) {
          message = error.error.message;
        }
        this.matDialog.open(ErrorComponent, { data: { message } });
        return throwError(error.error.message);
      })
    );
  }
}
