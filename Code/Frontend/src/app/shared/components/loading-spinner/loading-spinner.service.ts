import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {

    private counter = 0;
    private loadingSpinner$ = new BehaviorSubject<string>('');

    constructor() {
    }

    getLoadingSpinnerObserver(): Observable<string> {
        return this.loadingSpinner$.asObservable();
    }

    httpRequestInitiated(): void {
        if (++this.counter === 1) {
            this.loadingSpinner$.next('start');
        }
    }

    httpRequestCompleted(): void {
        if (this.counter === 0 || --this.counter === 0) {
            this.loadingSpinner$.next('stop');
        }
    }

    resetLoadingSpinner(): void {
        this.counter = 0;
        this.loadingSpinner$.next('stop');
    }
}
