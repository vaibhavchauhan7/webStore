import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationService} from './authentication/services/authentication.service';
import {AuthenticationGuardService} from './authentication/services/authentication-guard.service';
import {CommonService} from './shared/services/common.service';
import {ContactService} from './contact/services/contact.service';
import {CookieService} from 'ngx-cookie-service';
import {HttpController} from './shared/services/http-interceptors/http-controller';
import {ProductResolverService} from './product/services/product-resolver.service';
import {SharedModule} from './shared.module';

@NgModule({
    declarations: [],
    imports: [
        AppRoutingModule,
        BrowserModule,
        SharedModule
    ],
    providers: [
        AuthenticationService,
        AuthenticationGuardService,
        CommonService,
        ContactService,
        CookieService,
        ProductResolverService,
        HttpController,
        provideHttpClient()
    ]
})
export class AppModule {
}
