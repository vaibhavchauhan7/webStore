import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HttpRequestHandler} from './http-request-handler';
import {HttpErrorHandler} from './http-error-handler';

export const HttpController = [
    // Global Request Handler
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestHandler,
        multi: true
    },
    // Global Error Handler
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorHandler,
        multi: true
    }
];
