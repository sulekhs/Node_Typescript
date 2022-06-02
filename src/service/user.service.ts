import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../Models/User.model";

export async function createUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt'| 'updatedAt'| 'comparePassword'>>) {
    try {
        return await User.create(input);
    } catch (e:any) {
        throw new Error(e);
    }
};


export async function validatePassword({email,password} : {email:string, password:string}) {
    const user = await User.findOne({email});

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
       return false; 
    }
    
    return user;
}