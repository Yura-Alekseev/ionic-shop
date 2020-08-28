import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../shared/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: string;
  public error$: Subject<string> = new Subject<string>();

  get token(): string {
    if (localStorage.getItem('fb-token') !== '') {
      return localStorage.getItem('fb-token');
    } else {
      this.doLogout();
      return null;
    }
  }

  constructor(
      private http: HttpClient
  ) {}

  doLogin(user: User): Observable<any> {
    user.returnSecureToken = true;
    this.userName = user.email;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
  }

  doLogout() {
    this.setToken(null);
  }

  doRegister(user: User) {
    user.returnSecureToken = true;
    this.userName = user.email;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('E-mail not found');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid e-mail');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
    }

    return throwError(error);
  }
}
