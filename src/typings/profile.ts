export interface ResultsProfile {
    id: string;
    slug: string;
    name: string;
}

/* Read */

export interface ReadProfileParams {
    id: string;
}

export interface ReadProfileQuery {
    findBy: 'slug';
}

export type ReadProfileErrorCodes = 'POST_NOT_FOUND' | 'ERROR_FINDING_PROFILE';
