import { Response, NextFunction } from 'express';
import { InputRequestInterface } from '../../interfaces/InputError';
import { check, validationResult } from 'express-validator';
import { ErrorResponseInterface } from '../../interfaces/InputError';

const validateRegisterInput = [

    check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters in length')
    .matches(/^[a-zA-Z\s-'']+$/).withMessage('First name can only contain alphabetic characters, spaces, hyphens, and apostrophes'),

    check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters in length')
    .matches(/^[a-zA-Z\s-'']+$/).withMessage('Last name can only contain alphabetic characters, spaces, hyphens, and apostrophes'),

    check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Incorrect email address format'),

    check('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ max: 50 }).withMessage('Username cannot exceed 50 characters in length')
    .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/).withMessage('User name can only contain alphanumberic characters, numbers, and underscores, and cannot start with a number or underscore'),
    
    check('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ max: 64 }).withMessage('Password cannot exceed 64 characters in length')
    .isStrongPassword().withMessage('Password to weak. Must be at least 8 characters long and contain 1 uppercase, 1 lowercase, 1 number, and 1 symbol'),

    check('confirm_password')
    .trim()
    .notEmpty().withMessage('Confirm password is required')
    .isLength({ max: 64 }).withMessage('Confirm password cannot exceed 64 characters in length')
    .custom( (confirm_password, { req }) => {

        if(confirm_password !== req.body['password']) {
            throw new Error('Passwords do not match');
        }

        return true;

    } ),

    (req:InputRequestInterface, res:Response, next:NextFunction) => {

        const errors = validationResult(req);
        const response_errors:ErrorResponseInterface = req.input_errors || { message: {} };

        if(!errors.isEmpty()) {

            errors.array().forEach(error => {
                
                if('path' in error) {
                    
                    if(!response_errors.message[error.path]) {
                        response_errors.message[error.path] = [];
                    }

                    response_errors.message[error.path].push({
                        type: 'validation',
                        message: error.msg
                    });

                }

            });

        }

        // Return any sanitzation or validation errors if present
        if(Object.keys(response_errors.message).length > 0) {

            return res.status(400).json(response_errors);

        }

        next();

    }

];

export default validateRegisterInput;