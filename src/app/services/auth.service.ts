import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import { UserService } from './user.service';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token: string = 'empty';
  private loginSubject = new Subject<void>();
  private apiUrl = 'http://localhost:8080/api/v1'


  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

 login(email: string, password: string): Observable<any> {
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/signin`,
      {
        email: email,
        password: password
      },
      { observe: 'response' }
    ).pipe(
             tap(response => {
          if (response.status === 200) {
            console.log(<string>response.body?.token)
            this.userService.setToken(<string>response.body?.token);
            this.loginSubject.next();
          }
        })
    );
  }

  resetPassword(email: string) {
    return this.httpClient.post<any>(`http://localhost:8080/auth/reset-password`, {email: email}, {observe: 'response'});
  }

  submitNewPassword(password: string, token: string) {
    return this.httpClient.post<any>(`http://localhost:8080/auth/change-user-password`, {
      token: token,
      newPassword: password
    }, {observe: 'response'});
  }

  loginEvent(): Observable<void> {
    return this.loginSubject.asObservable();
  }
}
