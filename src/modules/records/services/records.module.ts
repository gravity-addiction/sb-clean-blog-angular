/* tslint:disable: ordered-imports*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
/* Components */
/* Containers */
/* Guards */
/* Pipes */
/* Services */
import { RecordsService } from './records.service';

@NgModule({
    imports: [CommonModule],
    providers: [RecordsService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecordsServiceModule {}
