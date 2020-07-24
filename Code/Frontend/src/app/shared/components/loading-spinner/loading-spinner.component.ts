import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LoadingSpinnerService} from './loading-spinner.service';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

    showLoadingSpinner: boolean = false;

    constructor(private _loadingSpinnerService: LoadingSpinnerService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.initializeLoadingSpinner();
    }

    initializeLoadingSpinner() {
        this._loadingSpinnerService.getLoadingSpinnerObserver().subscribe((status: string) => {
            this.showLoadingSpinner = status === 'start';
            this._changeDetectorRef.detectChanges();
        })
    }

}
