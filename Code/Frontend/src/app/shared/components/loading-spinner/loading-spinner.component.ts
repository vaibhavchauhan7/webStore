import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {CommonControllerService} from '../../services/common-controller.service';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

    showLoadingSpinner = false;

    private subscription$: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private commonControllerService: CommonControllerService) {
    }

    ngOnInit(): void {
        this.initializeLoadingSpinner();
    }

    initializeLoadingSpinner(): void {
        this.subscription$ = this.commonControllerService.getLoadingSpinnerObserver().subscribe((status: string) => {
            this.showLoadingSpinner = status === 'start';
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
