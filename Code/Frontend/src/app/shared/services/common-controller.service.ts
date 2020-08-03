import {Injectable} from '@angular/core';

import {Customer} from '../entity/customer.model';

@Injectable({
    providedIn: 'root'
})
export class CommonControllerService {

    isSidebarOpen = true;
    customer = {} as Customer;

    constructor() {
    }

    toggleSidebar(): void {
        document.getElementById('bar-container').classList.toggle('change');
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
