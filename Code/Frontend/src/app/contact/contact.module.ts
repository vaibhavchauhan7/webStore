import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContactComponent} from './contact.component';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactService} from './contact.service';

@NgModule({
    declarations: [ContactComponent],
    imports: [
        CommonModule,
        ContactRoutingModule,
        FormsModule
    ],
    providers: [
        ContactService
    ]
})
export class ContactModule {
}
