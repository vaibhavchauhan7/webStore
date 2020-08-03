import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {WebStoreRouting, WebStoreTitle} from '../shared/entity/constants';

const routes: Routes = [
    {
        path: `${WebStoreRouting.CART}`,
        component: CartComponent,
        data: {title: `${WebStoreTitle.CART}`}
    },
    {
        path: `${WebStoreRouting.ORDERS}`,
        component: OrdersComponent,
        data: {title: `${WebStoreTitle.ORDERS}`}
    },
    {
        path: `${WebStoreRouting.PROFILE}`,
        component: ProfileComponent,
        data: {title: `${WebStoreTitle.PROFILE}`}
    },
    {
        path: `${WebStoreRouting.WISHLIST}`,
        component: WishlistComponent,
        data: {title: `${WebStoreTitle.WISHLIST}`}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
