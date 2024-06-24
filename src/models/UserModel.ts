import mongoose, {model, Schema} from 'mongoose';
import UserInterface from '../interfaces/UserInterface';

const UserSchema = new Schema<UserInterface>({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    verifed: {
        type: Boolean,
        default: false
    },

    locked: {
        type: Boolean,
        default: false
    },

    login_attempts: {
        type: Number,
        default: 0
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    last_login: {
        type: Date,
        default: null
    }

});

const User = model<UserInterface>('User', UserSchema);

export default User;