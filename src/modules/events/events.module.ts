/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as eventsComponents from './components';

/* Containers */
import * as eventsContainers from './containers';

/* Guards */
import * as eventsGuards from './guards';

/* Services */
import * as eventsServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...eventsServices.services, ...eventsGuards.guards],
    declarations: [...eventsContainers.containers, ...eventsComponents.components],
    exports: [...eventsContainers.containers, ...eventsComponents.components],
})
export class EventsModule {}
