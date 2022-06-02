import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';
import { UserDocument } from "./User.model";

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
}

const SessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    valid:{
        type: Boolean,
        default: true,
    },
    userAgent:{
        type: String,
    }
},
{timestamps: true},
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;