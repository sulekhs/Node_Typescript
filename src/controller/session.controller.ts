import { Request, Response } from "express";
import User from "../Models/User.model";
import { CreateUserInput } from "../schema/user.schema";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";
import config from 'config';

export async function createSessionHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        //Validate Password
        const user = await validatePassword(req.body);
        if (!user) {
           return res.status(4001).send("Invalid email or password") 
        }
        

        //Create Session
        const session = await createSession(user._id, req.get("user-agent") || "");

        //create ana accessToken
        const accessToken = signJwt(
            {
            ...user,
            session: session._id
            },
            {
                expiresIn: config.get('accessTokenTtl')
            }
        );


        // create refresh token
        const refreshToken = signJwt(session, {
            expiresIn: config.get("refreshTokenTtl"), // 1 year
        });

           // send refresh & access token back
            return res.send({ accessToken, refreshToken });

    } catch (e:any) {
        logger.error(e);
        return res.status(401).send(e.message)
    }
};




