import {Application, Request, Response} from "express";
import {InitHandlebars, InitMiddleware} from "../../utils/express-middleware";
import * as fs from "fs";
import path from "path";

export const PublicRoutes = (app: Application) => {
    InitHandlebars(app);
    InitMiddleware(app);

    app.get('/', HomePage);
    app.get('/predictions', PredictionsPage);
    app.get('/history', HistoryPage);
}

const HomePage = async (req: Request, res: Response) => {
    const header = await fs.readFileSync(path.join(__dirname, './views/html/main-header.html'));
    const body = await fs.readFileSync(path.join(__dirname, './views/html/main.html'));
    res.render('template', {title: 'Green Bull', header, html: body});
}

const PredictionsPage = async (req: Request, res: Response) => {
    const body = await fs.readFileSync(path.join(__dirname, './views/html/predictions.html'));
    res.render('template', {title: 'Predictions', html: body});
};

const HistoryPage = async (req: Request, res: Response) => {
    const body = await fs.readFileSync(path.join(__dirname, './views/html/trade-history.html'));
    res.render('template', {title: 'History', html: body});
};