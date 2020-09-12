import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from './authentication/services/authentication.service';
import {AuthenticationGuardService} from './authentication/services/authentication-guard.service';
import {CommonControllerService} from './shared/services/common-controller.service';
import {ContactService} from './contact/contact.service';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {HomeComponent} from './home/home.component';
import {HttpController} from './shared/services/http-interceptors/http-controller';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {LoginComponent} from './authentication/components/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ProductComponent} from './product/product.component';
import {ProductResolverService} from './product/services/product-resolver.service';
import {SearchFilterPipe} from './shared/services/search-filter.pipe';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {SidebarService} from './shared/components/sidebar/sidebar.service';
import {SignUpComponent} from './authentication/components/sign-up/sign-up.component';
import {ToastComponent} from './shared/components/toast/toast.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        LoadingSpinnerComponent,
        LoginComponent,
        PageNotFoundComponent,
        ProductComponent,
        SearchFilterPipe,
        SidebarComponent,
        SignUpComponent,
        ToastComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [
        AuthenticationService,
        AuthenticationGuardService,
        CommonControllerService,
        ContactService,
        ProductResolverService,
        SidebarService,
        HttpController
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
