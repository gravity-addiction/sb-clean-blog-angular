/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { RecordsProfileModule } from '@modules/records/components/records-profile-a/records-profile.module';

/* Components */
import * as profilesComponents from './components';

/* Containers */
import * as profilesContainers from './containers';

/* Guards */
import * as profilesGuards from './guards';

/* Services */
import * as profilesServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
        NgxSpinnerModule,

        RecordsProfileModule,
    ],
    providers: [...profilesServices.services, ...profilesGuards.guards],
    declarations: [...profilesContainers.containers, ...profilesComponents.components],
    exports: [...profilesContainers.containers, ...profilesComponents.components],
})
export class ProfilesModule {}
