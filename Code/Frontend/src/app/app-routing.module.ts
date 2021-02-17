import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './authentication/components/forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './authentication/components/login/login.component';
import {ProductComponent} from './product/product.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ProductResolverService} from './product/services/product-resolver.service';
import {SignUpComponent} from './authentication/components/sign-up/sign-up.component';
import {WSRouting, WSTitle} from './shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {productList: ProductResolverService},
        data: {title: `${WSTitle.HOME}`}
    },
    {
        path: `${WSRouting.PRODUCT}/:id/:name`,
        component: ProductComponent
    },
    {
        path: `${WSRouting.ACCOUNT}`,
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: `${WSRouting.CONTACT}`,
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: `${WSRouting.LOGIN}`,
        component: LoginComponent,
        data: {title: `${WSTitle.LOGIN}`}
    },
    {
        path: `${WSRouting.SIGN_UP}`,
        component: SignUpComponent,
        data: {title: `${WSTitle.SIGN_UP}`}
    },
    {
        path: `${WSRouting.FORGOT}`,
        component: ForgotPasswordComponent,
        data: {title: `${WSTitle.FORGOT}`}
    },
    {
        path: `${WSRouting.PAGE_NOT_FOUND}`,
        component: PageNotFoundComponent,
        data: {title: `${WSTitle.PAGE_NOT_FOUND}`}
    },
    {
        path: `${WSRouting.PATH_DOES_NOT_EXIST}`,
        redirectTo: `/${WSRouting.PAGE_NOT_FOUND}`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
