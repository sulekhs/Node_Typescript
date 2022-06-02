import { Express, Request, Response } from "express";
import { createSessionHandler } from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from './../schema/user.schema';
const routes = (app:Express) => {
    app.get("/healthCheck", (req: Request, res:Response) => {
        res.sendStatus(200);
    });

    app.post("/api/users", validate(createUserSchema) ,createUserHandler);

    
    // Get the user's sessions
    app.get("/api/sessions", createSessionHandler);
};


export default routes;