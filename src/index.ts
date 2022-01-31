import {InitEnvVars} from "./utils/dotenv";

InitEnvVars();

import 'source-map-support/register'
import {GreenBullRoutes} from "./server/routes";
import {StartServer} from "./server";
import {Reports} from "./utils/reports";

// The port number we want our https app to run on.
const httpsPort = process.env.HTTPS_PORT || 8443;
// The port number we want our http app to run on.
// ** Only gets triggered on our local env **
const httpPort = process.env.HTTP_PORT || 8080;

// Specify our MDM related routes.
const serverRoutes = GreenBullRoutes();

// Start the HTTP/S server.
StartServer(serverRoutes, httpsPort, httpPort).then(() => {
    Reports.print('Server up');
}).catch(() => {
    Reports.print('Failed to start server.')
});