import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import { AppComponent } from './app/app.component';
import {environment} from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import { routes } from './app/app-routing.module';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
    ]
}).catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
