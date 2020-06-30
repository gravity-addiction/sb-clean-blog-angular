/* tslint:disable: ordered-imports*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as recordsComponents from './components';

/* Containers */
import * as recordsContainers from './containers';

/* Guards */
import * as recordsGuards from './guards';

/* Pipes */
import * as recordsPipes from './pipes';

/* Services */
import * as recordsServices from './services';

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
    ],
    providers: [...recordsServices.services, ...recordsGuards.guards],
    declarations: [
        ...recordsPipes.pipes,
        ...recordsContainers.containers,
        ...recordsComponents.components,
    ],
    exports: [...recordsContainers.containers, ...recordsComponents.components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecordsModule {}
