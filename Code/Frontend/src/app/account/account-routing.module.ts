import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountComponent} from './account.component';
import {AuthenticationGuardService} from '../authentication/services/authentication-guard.service';
import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {WebStoreRouting, WebStoreTitle} from '../shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: `${WebStoreRouting.CART}`,
                canActivate: [AuthenticationGuardService],
                component: CartComponent,
                data: {title: `${WebStoreTitle.CART}`}
            },
            {
                path: `${WebStoreRouting.ORDERS}`,
                canActivate: [AuthenticationGuardService],
                component: OrdersComponent,
                data: {title: `${WebStoreTitle.ORDERS}`}
            },
            {
                path: `${WebStoreRouting.PROFILE}`,
                canActivate: [AuthenticationGuardService],
                component: ProfileComponent,
                data: {title: `${WebStoreTitle.PROFILE}`}
            },
            {
                path: `${WebStoreRouting.WISHLIST}`,
                canActivate: [AuthenticationGuardService],
                component: WishlistComponent,
                data: {title: `${WebStoreTitle.WISHLIST}`}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
