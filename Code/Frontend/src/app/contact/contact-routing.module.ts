import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContactComponent} from './contact.component';
import {WebStoreTitle} from '../shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        data: {title: `${WebStoreTitle.CONTACT}`}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {
}
