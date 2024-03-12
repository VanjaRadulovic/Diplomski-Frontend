import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserData } from '../models/userModel';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers
  private token: string
  private userData!: UserData

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("token") !== null) {
      this.token = localStorage.getItem("token")!
    } else {
      this.token = sessionStorage.getItem("token")!
    }
  
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.token}`)
  }

  resetToken() {
    this.token = ''

  }

  setToken(token: string) {
    this.token = token
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`)
  }

  getToken() {
    return this.token !== null
  }

  // getUserData() {
  //   this.httpClient.get<UserData>('http://localhost:8080/api/v1/users/data', { headers: this.headers }).subscribe(
  //     (response: any) => {
  //       this.userData = response.body;
  //       console.log(this.userData.firstName);
  //     },
  //     error => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }


}
