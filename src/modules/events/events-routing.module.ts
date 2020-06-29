/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { EventsModule } from './events.module';

/* Containers */
import * as eventsContainers from './containers';

/* Guards */
import * as eventsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        component: eventsContainers.HomeComponent,
    },
];

@NgModule({
    imports: [EventsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class EventsRoutingModule {}
