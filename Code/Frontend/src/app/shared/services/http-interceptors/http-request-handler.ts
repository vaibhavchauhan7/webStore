import {Injectable} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {CookieService} from 'ngx-cookie-service';
import {CommonService} from '../common.service';

@Injectable()
export class HttpRequestHandler implements HttpInterceptor {

    constructor(private cookieService: CookieService,
                private commonService: CommonService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenCookie = this.cookieService.get('token');
        this.commonService.httpRequestInitiated();

        if (tokenCookie) {
            const authRequest = request.clone({
                setHeaders: {Authorization: `Bearer ${tokenCookie}`}
            });
            // return next.handle(authRequest);
            return this.requestHandler(authRequest, next);
        } else {
            return this.requestHandler(request, next);
        }
    }

    requestHandler(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.commonService.httpRequestCompleted();
                }
            }, (error: HttpErrorResponse) => {
                this.commonService.httpRequestCompleted();
                throw error;
            })
        );
    }

}
