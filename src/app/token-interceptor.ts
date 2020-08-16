import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LoginResponsePayload } from './auth/login/login-response.payload';

@Injectable({
    providedIn : "root"
})
export class TokenInterceptor implements HttpInterceptor{

    isTokenRefreshing : boolean;
    refreshTokenSubject : BehaviorSubject<any> = new BehaviorSubject(null);
    
    constructor(private authService : AuthService){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const jwtToken = this.authService.getJwtToken();
        if(jwtToken){
            this.addToken(req, jwtToken);
        }
        return next.handle(req).pipe(catchError(error => {
            if(error instanceof HttpErrorResponse && error.status == 403){
                return this.handleAuthError(req, next);
            }
            else{
                return throwError;
            }
        }));

    }
    handleAuthError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.isTokenRefreshing){
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResponse : LoginResponsePayload) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
                })
            );
        }
        else{
            return this.refreshTokenSubject.pipe(
                filter(result => result != null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req, this.authService.getJwtToken()))
                })
            );
        }
        return null;
    }
    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers : req.headers.set('Authorizarion' : 'Bearer '+jwtToken);
        })
    }
    
}