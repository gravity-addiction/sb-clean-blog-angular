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
import { RecordsServiceModule } from '@modules/records/services/records.module';

/* Components */
import { RecordsProfileAComponent } from './records-profile-a.component';

/* Containers */

/* Guards */

/* Pipes */

/* Services */

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

        RecordsServiceModule,
    ],
    declarations: [RecordsProfileAComponent],
    exports: [RecordsProfileAComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecordsProfileModule {}
