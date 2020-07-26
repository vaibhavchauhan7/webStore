import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {User} from "../../shared/entity/user.model";
import {CONSTANTS} from "../../shared/entity/constants";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    redirectUrl: string = '';
    isUserAuthenticated: boolean = false;

    constructor(private _http: HttpClient) {
    }

    onSignUp(signUpFormValue): Observable<User> {
        return this._http.post<User>(`${CONSTANTS.API_URL}/sign-up`, signUpFormValue);
    }

    onLogin(loginFormValue) {
        return this._http.get(`${CONSTANTS.API_URL}/login`);
    }
}
