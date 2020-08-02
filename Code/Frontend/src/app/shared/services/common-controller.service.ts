import {Injectable} from '@angular/core';

import {Customer} from "../entity/customer.model";

@Injectable({
    providedIn: 'root'
})
export class CommonControllerService {

    isSidebarOpen: boolean = true;
    customer = {} as Customer;

    constructor() {
    }

    toggleSidebar() {
        document.getElementById('bar-container').classList.toggle('change');
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}
