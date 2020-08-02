import {Injectable} from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {LoadingSpinnerService} from "../../components/loading-spinner/loading-spinner.service";

@Injectable()
export class HttpRequestHandler implements HttpInterceptor {

    constructor(private _loadingSpinnerService: LoadingSpinnerService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._loadingSpinnerService.httpRequestInitiated();

        if ('token' in sessionStorage) {
            const authRequest = request.clone({
                setHeaders: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
            });
            // return next.handle(authRequest);
            return this.requestHandler(authRequest, next);
        } else {
            return this.requestHandler(request, next);
        }
    }

    // Making Loading Spinner Global - Intercepts Every HTTP Request
    requestHandler(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this._loadingSpinnerService.httpRequestCompleted();
                }
            }, (error: HttpErrorResponse) => {
                this._loadingSpinnerService.resetLoadingSpinner();
                throw error;
            })
        )
    }
}
