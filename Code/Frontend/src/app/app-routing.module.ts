import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./authentication/components/login/login.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {SignUpComponent} from "./authentication/components/sign-up/sign-up.component";
import {ProductComponent} from "./product/product.component";
import {ProductResolverService} from "./product/services/product-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {productList: ProductResolverService},
        data: {title: 'webStore - Home'}
    },
    {
        path: 'product/:id/:name',
        component: ProductComponent
        // Title is implemented in product.component.ts for dynamic title
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {title: 'webStore - Login'}
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        data: {title: 'webStore - Sign Up'}
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        data: {title: 'webStore - Page Not Found'}
    },
    {
        path: '**',
        redirectTo: '/page-not-found'
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
