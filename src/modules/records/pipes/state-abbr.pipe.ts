import { Pipe, PipeTransform } from '@angular/core';

import * as stateAbbr from '../models/state-abbr.model';

@Pipe({ name: 'sbStateAbbr' })
export class StateAbbrPipe implements PipeTransform {
    transform(value: string): string {
        const sLen = stateAbbr.stateAbbrList.length;
        for (let i = 0; i < sLen; i++) {
            if (stateAbbr.stateAbbrList[i].abbr.toLocaleLowerCase() === value.toLocaleLowerCase()) {
                return stateAbbr.stateAbbrList[i].name + ' State';
            }
        }
        return 'National';
    }
}
