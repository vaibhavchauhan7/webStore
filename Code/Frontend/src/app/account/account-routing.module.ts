import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CartComponent} from "./components/cart/cart.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {WishlistComponent} from "./components/wishlist/wishlist.component";

const routes: Routes = [
    {
        path: 'cart', component: CartComponent
    },
    {
        path: 'orders', component: OrdersComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'wishlist', component: WishlistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
