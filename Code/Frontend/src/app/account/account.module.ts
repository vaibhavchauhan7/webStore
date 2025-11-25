import {NgModule} from '@angular/core';

import {AccountRoutingModule} from './account-routing.module';
import {AccountService} from './account.service';
import {SharedModule} from '../shared.module';

@NgModule({
    declarations: [],
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
