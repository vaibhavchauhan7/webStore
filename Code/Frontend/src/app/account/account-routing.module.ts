import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CartComponent} from "./components/cart/cart.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";

const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        data: {title: 'webStore - Cart'}
    },
    {
        path: 'orders',
        component: OrdersComponent,
        data: {title: 'webStore - Orders'}
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {title: 'webStore - Profile'}
    },
    {
        path: 'wishlist',
        component: WishlistComponent,
        data: {title: 'webStore - Wishlist'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
