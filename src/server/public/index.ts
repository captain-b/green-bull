import {Application, Request, Response} from "express";
import {InitHandlebars, InitMiddleware} from "../../utils/express-middleware";
import * as fs from "fs";
import path from "path";
import {Env} from "../../utils/dotenv/variables";
const template = 'template';

export const PublicRoutes = (app: Application) => {
    InitHandlebars(app);
    InitMiddleware(app);

    app.get('/', HomePage);
    app.get('/predictions', PredictionsPage);
    app.get('/history', HistoryPage);
    app.get('/logo', MiniLogo);
    app.get('/*', PageNotFound);
}

const PageNotFound = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './views/html/page-not-found.html'));
}

const HomePage = async (req: Request, res: Response) => {
    const header = await fs.readFileSync(path.join(__dirname, './views/html/main-header.html'));
    const body = await fs.readFileSync(path.join(__dirname, './views/html/main.html'));
    const content: Template = {
        title: 'Green Bull',
        chainId: Env.network.chainId,
        html: body,
        header,
        contracts: {
            airdrop: Env.airdrop
        }
    }
    res.render(template, content);
}

const PredictionsPage = async (req: Request, res: Response) => {
    const body = await fs.readFileSync(path.join(__dirname, './views/html/predictions.html'));
    const content: Template = {
        title: 'Predictions',
        chainId: Env.network.chainId,
        html: body,
        contracts: {
            prediction: Env.prediction,
            usdt: Env.usdtToken
        }
    }

    res.render(template, content);
};

const HistoryPage = async (req: Request, res: Response) => {
    const body = await fs.readFileSync(path.join(__dirname, './views/html/trade-history.html'));
    const content: Template = {
        title: 'Predictions',
        chainId: Env.network.chainId,
        html: body,
        contracts: {
            prediction: Env.prediction,
        }
    }

    res.render(template, content);
};

const ComingSoon = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './views/html/coming-soon.html'));
}

const MiniLogo = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './views/assets/img/mini-logo.png'))
}
