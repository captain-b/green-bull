import express, {Application} from "express";
import {PublicRoutes} from "./public";

export const GreenBullRoutes = (): Application => {
    const app: Application = express()

    PublicRoutes(app);

    return app;
}