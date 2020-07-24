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

        // ************** Demo Code **************
        // const authToken = 'This will be replaced by JWT later'
        // const authRequest = request.clone({
        //     setHeaders: {Authorization: authToken}
        // });
        // return next.handle(authRequest);

        this._loadingSpinnerService.httpRequestInitiated();
        return this.requestHandler(request, next);
    }

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
