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

import {LoadingSpinnerService} from '../../components/loading-spinner/loading-spinner.service';

@Injectable()
export class HttpRequestHandler implements HttpInterceptor {

    constructor(private loadingSpinnerService: LoadingSpinnerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingSpinnerService.httpRequestInitiated();

        if ('token' in localStorage) {
            const authRequest = request.clone({
                setHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`}
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
                    this.loadingSpinnerService.httpRequestCompleted();
                }
            }, (error: HttpErrorResponse) => {
                this.loadingSpinnerService.resetLoadingSpinner();
                throw error;
            })
        );
    }
}
