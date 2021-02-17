import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountComponent} from './account.component';
import {AuthenticationGuardService} from '../authentication/services/authentication-guard.service';
import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {WSRouting, WSTitle} from '../shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: `${WSRouting.CART}`,
                canActivate: [AuthenticationGuardService],
                component: CartComponent,
                data: {title: `${WSTitle.CART}`}
            },
            {
                path: `${WSRouting.ORDERS}`,
                canActivate: [AuthenticationGuardService],
                component: OrdersComponent,
                data: {title: `${WSTitle.ORDERS}`}
            },
            {
                path: `${WSRouting.PROFILE}`,
                canActivate: [AuthenticationGuardService],
                component: ProfileComponent,
                data: {title: `${WSTitle.PROFILE}`}
            },
            {
                path: `${WSRouting.WISHLIST}`,
                canActivate: [AuthenticationGuardService],
                component: WishlistComponent,
                data: {title: `${WSTitle.WISHLIST}`}
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
