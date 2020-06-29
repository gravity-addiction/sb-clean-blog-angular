/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { RecordsModule } from './records.module';

/* Containers */
import * as recordsContainers from './containers';

/* Guards */
import * as recordsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        component: recordsContainers.HomeComponent,
    },
];

@NgModule({
    imports: [RecordsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class RecordsRoutingModule {}
