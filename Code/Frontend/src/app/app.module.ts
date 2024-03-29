import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from './authentication/services/authentication.service';
import {AuthenticationGuardService} from './authentication/services/authentication-guard.service';
import {CommonService} from './shared/services/common.service';
import {ContactComponent} from './contact/contact.component';
import {ContactService} from './contact/services/contact.service';
import {CookieService} from 'ngx-cookie-service';
import {FooterComponent} from './shared/components/footer/footer.component';
import {ForgotPasswordComponent} from './authentication/components/forgot-password/forgot-password.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {HomeComponent} from './home/home.component';
import {HttpController} from './shared/services/http-interceptors/http-controller';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';
import {LoginComponent} from './authentication/components/login/login.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ProductComponent} from './product/product.component';
import {ProductResolverService} from './product/services/product-resolver.service';
import {SearchFilterPipe} from './shared/services/search-filter.pipe';
import {SharedModule} from './shared.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {SignUpComponent} from './authentication/components/sign-up/sign-up.component';
import {ToastComponent} from './shared/components/toast/toast.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        FooterComponent,
        ForgotPasswordComponent,
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
        HttpClientModule,
        SharedModule
    ],
    providers: [
        AuthenticationService,
        AuthenticationGuardService,
        CommonService,
        ContactService,
        CookieService,
        ProductResolverService,
        HttpController
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
