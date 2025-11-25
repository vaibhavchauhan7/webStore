import {TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideLocationMocks} from '@angular/common/testing';
import {provideRouter} from '@angular/router';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {ToastComponent} from './shared/components/toast/toast.component';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideRouter([]),
                provideLocationMocks(),
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
                LoadingSpinnerComponent,
                SidebarComponent,
                ToastComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'webStore'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('webStore');
    });
});
