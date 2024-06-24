import { Document } from 'mongoose';


export default interface UserInterface extends Document {
    
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    verifed: boolean;
    locked: boolean;
    login_attempts: number;
    created_at: Date;
    last_login: Date;

};