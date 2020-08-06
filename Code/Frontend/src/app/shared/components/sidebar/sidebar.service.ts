import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    isSidebarOpen$ = new BehaviorSubject(true);

    constructor() {
    }

    getSidebarObserver(): Observable<boolean> {
        return this.isSidebarOpen$.asObservable();
    }

    openSidebar(): void {
        document.getElementById('bar-container').classList.toggle('change');
        return this.isSidebarOpen$.next(true);
    }

    closeSidebar(): void {
        document.getElementById('bar-container').classList.toggle('change');
        return this.isSidebarOpen$.next(false);
    }
}
