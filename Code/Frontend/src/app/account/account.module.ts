import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
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
        CommonModule,
        FormsModule
    ]
})
export class AccountModule {
}
