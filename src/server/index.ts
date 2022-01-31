import {Application} from "express";
import https from "https";
import {readFileSync as ReadFile} from "fs";
import http from "http";

export const StartServer = async (routes: Application, httpsPort?: string | number, httpPort?: string | number): Promise<void> => {
    await startServer(routes, httpsPort, httpPort);
    return;
}

const startServer = async (app: Application, httpsPort?: string | number, httpPort?: string | number): Promise<void> => {
    // If we have SSL creds then set up an HTTPS server. Otherwise set up an HTTP one.
    if (process.env.SSL_KEY && process.env.SSL_CERT && process.env.SSL_BUNDLE) {
        await setupHTTPSServer(app, Number(httpsPort));
        process.env.NODE_ENV === 'local-dev' && await setupHTTPServer(app, Number(httpPort)); // Setup http server for "local-dev" env.
    } else {
        await setupHTTPServer(app, Number(httpPort));
    }
}

const setupHTTPSServer = async (app: Application, port?: number): Promise<void> => {
    await https.createServer({
        key: ReadFile(process.env.SSL_KEY as string),
        cert: ReadFile(process.env.SSL_CERT as string),
        ca: ReadFile(process.env.SSL_BUNDLE as string)
    }, app).listen(port);

    console.log(`HTTPS server running on port ${port}.`);
}

const setupHTTPServer = async (app: Application, port?: number): Promise<void> => {
    await http.createServer(app).listen(port);
    console.log(`HTTP server running on port ${port}.`);
}