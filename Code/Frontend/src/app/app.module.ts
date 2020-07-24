import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {HomeComponent} from './home/home.component';
import {HttpController} from "./shared/services/http-interceptors/http-controller";
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SearchFilterPipe} from './shared/services/search-filter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        LoadingSpinnerComponent,
        PageNotFoundComponent,
        SearchFilterPipe
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        HttpController
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
