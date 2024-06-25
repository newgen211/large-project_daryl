import { Request, Response, NextFunction } from 'express';
import sanitizeHtml from 'sanitize-html';
import { ErrorResponseInterface, InputRequestInterface } from '../interfaces/InputError';

const sanitizeInput = (req:InputRequestInterface, res:Response, next:NextFunction) => {

    const blacklist:string[]                     = ['password', 'confirm_password'];
    const response_errors:ErrorResponseInterface = { message: {} };
    
    Object.keys(req.body).forEach(field => {

        if(blacklist.includes(field)) return;

        const clean_field = sanitizeHtml(req.body[field], {allowedTags: [], allowedAttributes: {}});

        if(clean_field !== req.body[field]) {

            if(!response_errors.message[field]) {
                response_errors.message[field] = [];
            }

            response_errors.message[field].push({
                type: 'sanitization',
                message: `${field} contains invalid characters. Please remove any special characters or HTML tags.`
            });

        }

    });

    // Attack the error response to the request
    req.input_errors = response_errors;

    next();

    

};

export default sanitizeInput;


/* 

ERROR FORMAT
_____________

{

message: {

    "first_name": [
    
        {
            'type': 'sanitization',
            'message': 'First name contains invalid characters. Please remove any special characters or HTML tags.'          
        },
        {
            'type': 'validation',
            'message': 'Firt name cannot exceed 50 character's in length'
        }

    ],

    'last_name': [], 

}

}

*/