import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LoadingSpinnerService} from './loading-spinner.service';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

    showLoadingSpinner = false;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private loadingSpinnerService: LoadingSpinnerService) {
    }

    ngOnInit(): void {
        this.initializeLoadingSpinner();
    }

    initializeLoadingSpinner(): void {
        this.loadingSpinnerService.getLoadingSpinnerObserver().subscribe((status: string) => {
            this.showLoadingSpinner = status === 'start';
            this.changeDetectorRef.detectChanges();
        });
    }
}
