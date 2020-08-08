import {Injectable} from '@angular/core';

import {Toast} from '../../entity/models';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: Toast[] = [];

    constructor() {
    }

    showToast(toastMessage: string, options: any = {}): void {
        this.toasts.push({toastMessage, ...options});
    }

    removeToast(toast: Toast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}
