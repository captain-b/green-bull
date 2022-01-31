import express, {Application, json, urlencoded} from "express";
import cons from "consolidate";
import path from "path";

export const InitMiddleware = (app: Application) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
}

export const InitHandlebars = (app: Application) => {
    app.engine('html', cons.handlebars);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../../server/public/views/html'));
    app.use(express.static(path.join(__dirname, '../../server/public/views')));
}