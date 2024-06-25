import { Request } from 'express';

export interface InputErrorInterface {

    type: 'sanitization' | 'validation';
    message: string;

};

type InputErrors = InputErrorInterface[];

export interface ErrorResponseInterface {

    message: {
        [field_name: string]: InputErrors;
    }

};

export interface InputRequestInterface extends Request {
    input_errors?: ErrorResponseInterface;
};