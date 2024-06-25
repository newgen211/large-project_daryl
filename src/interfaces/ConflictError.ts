import { Request } from 'express';

export interface ConflictErrorInterface {

    type: 'conflict';
    message: string;

};

type ConflictErrors = ConflictErrorInterface[];

export interface ConflictErrorResponseInterface {

    message: {
        [field_name: string]: ConflictErrors;
    }

};
