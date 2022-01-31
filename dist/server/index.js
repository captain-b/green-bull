"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const https_1 = __importDefault(require("https"));
const fs_1 = require("fs");
const http_1 = __importDefault(require("http"));
exports.StartServer = async (routes, httpsPort, httpPort) => {
    await startServer(routes, httpsPort, httpPort);
    return;
};
const startServer = async (app, httpsPort, httpPort) => {
    // If we have SSL creds then set up an HTTPS server. Otherwise set up an HTTP one.
    if (process.env.SSL_KEY && process.env.SSL_CERT && process.env.SSL_BUNDLE) {
        await setupHTTPSServer(app, Number(httpsPort));
        process.env.NODE_ENV === 'local-dev' && await setupHTTPServer(app, Number(httpPort)); // Setup http server for "local-dev" env.
    }
    else {
        await setupHTTPServer(app, Number(httpPort));
    }
};
const setupHTTPSServer = async (app, port) => {
    await https_1.default.createServer({
        key: fs_1.readFileSync(process.env.SSL_KEY),
        cert: fs_1.readFileSync(process.env.SSL_CERT),
        ca: fs_1.readFileSync(process.env.SSL_BUNDLE)
    }, app).listen(port);
    console.log(`HTTPS server running on port ${port}.`);
};
const setupHTTPServer = async (app, port) => {
    await http_1.default.createServer(app).listen(port);
    console.log(`HTTP server running on port ${port}.`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQiwyQkFBNEM7QUFDNUMsZ0RBQXdCO0FBRVgsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLE1BQW1CLEVBQUUsU0FBMkIsRUFBRSxRQUEwQixFQUFpQixFQUFFO0lBQzdILE1BQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsT0FBTztBQUNYLENBQUMsQ0FBQTtBQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxHQUFnQixFQUFFLFNBQTJCLEVBQUUsUUFBMEIsRUFBaUIsRUFBRTtJQUNuSCxrRkFBa0Y7SUFDbEYsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtRQUN2RSxNQUFNLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxXQUFXLElBQUksTUFBTSxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMseUNBQXlDO0tBQ2xJO1NBQU07UUFDSCxNQUFNLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDaEQ7QUFDTCxDQUFDLENBQUE7QUFFRCxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxHQUFnQixFQUFFLElBQWEsRUFBaUIsRUFBRTtJQUM5RSxNQUFNLGVBQUssQ0FBQyxZQUFZLENBQUM7UUFDckIsR0FBRyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFpQixDQUFDO1FBQzVDLElBQUksRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBa0IsQ0FBQztRQUM5QyxFQUFFLEVBQUUsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQW9CLENBQUM7S0FDakQsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUE7QUFFRCxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQUUsR0FBZ0IsRUFBRSxJQUFhLEVBQWlCLEVBQUU7SUFDN0UsTUFBTSxjQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQSJ9