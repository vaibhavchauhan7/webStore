import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {

    private counter: number = 0;
    private loadingSpinner$ = new BehaviorSubject<string>('');

    constructor() {
    }

    getLoadingSpinnerObserver(): Observable<string> {
        return this.loadingSpinner$.asObservable();
    }

    httpRequestInitiated() {
        if (++this.counter === 1) {
            this.loadingSpinner$.next('start');
        }
    }

    httpRequestCompleted() {
        if (this.counter === 0 || --this.counter === 0) {
            this.loadingSpinner$.next('stop');
        }
    }

    resetLoadingSpinner() {
        this.counter = 0;
        this.loadingSpinner$.next('stop');
    }

}
