import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {CartComponent} from './components/cart/cart.component';
import {ProfileComponent} from './components/profile/profile.component';
import {OrdersComponent} from './components/orders/orders.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';


@NgModule({
    declarations: [
        AccountComponent,
        CartComponent,
        ProfileComponent,
        OrdersComponent,
        WishlistComponent
    ],
    imports: [
        AccountRoutingModule,
        CommonModule
    ]
})
export class AccountModule {
}
