import {NgModule} from '@angular/core';

import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {AccountService} from './account.service';
import {CartComponent} from './components/cart/cart.component';
import {ModalComponent} from '../shared/components/modal/modal.component';
import {OrdersComponent} from './components/orders/orders.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SharedModule} from '../shared.module';
import {WishlistComponent} from './components/wishlist/wishlist.component';

@NgModule({
    declarations: [
        AccountComponent,
        CartComponent,
        ProfileComponent,
        ModalComponent,
        OrdersComponent,
        WishlistComponent
    ],
    imports: [
        AccountRoutingModule,
        SharedModule
    ],
    providers: [
        AccountService
    ]
})
export class AccountModule {
}
