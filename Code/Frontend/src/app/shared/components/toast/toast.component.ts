import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

import {Toast} from '../../entity/models';
import {ToastService} from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    imports: [
        NgbToast,
        NgForOf
    ],
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
