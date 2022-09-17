import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {CommonService} from '../../services/common.service';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

    showLoadingSpinner = false;
    private subscription$: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.initializeLoadingSpinner();
    }

    initializeLoadingSpinner(): void {
        this.subscription$ = this.commonService.getLoadingSpinnerStatus().subscribe({
            next: (status: string) => {
                this.showLoadingSpinner = status === 'start';
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription$?.unsubscribe();
    }

}
