import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./authentication/components/login/login.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {SignUpComponent} from "./authentication/components/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
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
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
