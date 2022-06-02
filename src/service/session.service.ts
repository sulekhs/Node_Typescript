import { DocumentDefinition } from "mongoose";
import Session from "../Models/Session.model";

export async function createSession(userId: string, userAgent: string) {
    try {
        const session = await Session.create({ user: userId, userAgent });

        return session.toJSON()
    } catch (e:any) {
        throw new Error(e);
    }
}