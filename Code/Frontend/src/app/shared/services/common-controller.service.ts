import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonControllerService {

    isSidebarOpen: boolean = true;

    constructor() {
    }

    toggleSidebar() {
        document.getElementById('bar-container').classList.toggle('change');
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
