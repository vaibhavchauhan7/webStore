import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './authentication/components/forgot-password/forgot-password.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './authentication/components/login/login.component';
import {ProductComponent} from './product/product.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ProductResolverService} from './product/services/product-resolver.service';
import {SignUpComponent} from './authentication/components/sign-up/sign-up.component';
import {WebStoreRouting, WebStoreTitle} from './shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {productList: ProductResolverService},
        data: {title: `${WebStoreTitle.HOME}`}
    },
    {
        path: `${WebStoreRouting.PRODUCT}/:id/:name`,
        component: ProductComponent
    },
    {
        path: `${WebStoreRouting.ACCOUNT}`,
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: `${WebStoreRouting.CONTACT}`,
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: `${WebStoreRouting.LOGIN}`,
        component: LoginComponent,
        data: {title: `${WebStoreTitle.LOGIN}`}
    },
    {
        path: `${WebStoreRouting.SIGN_UP}`,
        component: SignUpComponent,
        data: {title: `${WebStoreTitle.SIGN_UP}`}
    },
    {
        path: `${WebStoreRouting.FORGOT}`,
        component: ForgotPasswordComponent,
        data: {title: `${WebStoreTitle.FORGOT}`}
    },
    {
        path: `${WebStoreRouting.PAGE_NOT_FOUND}`,
        component: PageNotFoundComponent,
        data: {title: `${WebStoreTitle.PAGE_NOT_FOUND}`}
    },
    {
        path: `${WebStoreRouting.PATH_DOES_NOT_EXIST}`,
        redirectTo: `/${WebStoreRouting.PAGE_NOT_FOUND}`
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
