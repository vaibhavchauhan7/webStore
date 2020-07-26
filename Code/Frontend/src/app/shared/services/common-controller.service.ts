import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommonControllerService {

    isSidebarOpen$ = new BehaviorSubject<boolean>(true);
    isSidebarOpen: boolean = true;

    constructor() {
    }

    // getSidebarObserver() {
    //     return this.isSidebarOpen$.asObservable();
    // }

    openSidebar(): boolean {
        this.isSidebarOpen$.next(true);
        return true;
    }

    closeSidebar(): boolean {
        this.isSidebarOpen$.next(false);
        return false;
    }

    toggleSidebar() {
        document.getElementById('bar-container').classList.toggle('change');
        if (this.isSidebarOpen) {
            this.closeSidebar();
            this.isSidebarOpen = false;
        } else {
            this.openSidebar();
            this.isSidebarOpen = true;
        }
    }
}
