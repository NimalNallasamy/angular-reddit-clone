import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUpRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload'
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn : EventEmitter<boolean> = new EventEmitter();
  @Output() userName : EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken  : this.getRefreshToken(),
    userName : this.getUserName()
  }

  constructor(private httpClient : HttpClient, private localStorage : LocalStorageService) { }

  signUp(signUpPayloadrequest : SignUpRequestPayload) : Observable<any>{
    return this.httpClient.post("http://localhost:8080/api/auth/signup", signUpPayloadrequest, {responseType:'text'});
  }

  /*
  * To store the authentication Token and Refresh token we make use of ngx-webstorage.
  */
  login(LoginRequestPayload : LoginRequestPayload) : Observable<boolean>{
    return this.httpClient.post<LoginResponsePayload>("http://localhost:8080/api/auth/login", LoginRequestPayload)
    .pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('expiresAt', data.expiresAt);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('userName', data.userName);

      this.loggedIn.emit(true);
      this.userName.emit(data.userName);

      return true;
    }));
  }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName(){
    return this.localStorage.retrieve('userName');
  }

  refreshToken(){
    const refreshTokenPayload = {
      refreshToken : this.getRefreshToken(),
      userName : this.getUserName()
    } 

    return this.httpClient.post<LoginResponsePayload>("http://localhost:8080/api/auth/refresh/token", refreshTokenPayload)
    .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt); 
    }));
  }

  isLoggedIn(){
    return (this.getJwtToken != null); 
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {responseType : 'text'}).subscribe(
      (data) => {
        console.log(data);
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('refreshToken');
        this.localStorage.clear('userName');
        this.localStorage.clear('expiresAt');
      }
    );
  }
}
