import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Contact} from '../shared/entity/models';
import {WebStoreAPI} from '../shared/entity/constants';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {
    }

    customerContact(contactFormValue: Contact): Observable<void> {
        return this.http.post<void>(`/${WebStoreAPI.BASE_URL}/${WebStoreAPI.CONTACT}`, contactFormValue);
    }
}
