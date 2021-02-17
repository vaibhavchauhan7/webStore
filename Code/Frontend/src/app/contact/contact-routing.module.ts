import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContactComponent} from './contact.component';
import {WSTitle} from '../shared/entity/constants';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        data: {title: `${WSTitle.CONTACT}`}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {
}
