import {Component, OnInit} from '@angular/core';

import {Toast} from '../../entity/models';
import {ToastService} from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    constructor(public toastService: ToastService) {
    }

    ngOnInit(): void {
    }

    removeToast(toast: Toast): void {
        this.toastService.removeToast(toast);
    }

}
