"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("./utils/dotenv");
dotenv_1.InitEnvVars();
require("source-map-support/register");
const routes_1 = require("./server/routes");
const server_1 = require("./server");
const reports_1 = require("./utils/reports");
// The port number we want our https app to run on.
const httpsPort = process.env.HTTPS_PORT || 8443;
// The port number we want our http app to run on.
// ** Only gets triggered on our local env **
const httpPort = process.env.HTTP_PORT || 8080;
// Specify our MDM related routes.
const serverRoutes = routes_1.GreenBullRoutes();
// Start the HTTP/S server.
server_1.StartServer(serverRoutes, httpsPort, httpPort).then(() => {
    reports_1.Reports.print('Server up');
}).catch(() => {
    reports_1.Reports.print('Failed to start server.');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMkM7QUFFM0Msb0JBQVcsRUFBRSxDQUFDO0FBRWQsdUNBQW9DO0FBQ3BDLDRDQUFnRDtBQUNoRCxxQ0FBcUM7QUFDckMsNkNBQXdDO0FBRXhDLG1EQUFtRDtBQUNuRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUM7QUFDakQsa0RBQWtEO0FBQ2xELDZDQUE2QztBQUM3QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFFL0Msa0NBQWtDO0FBQ2xDLE1BQU0sWUFBWSxHQUFHLHdCQUFlLEVBQUUsQ0FBQztBQUV2QywyQkFBMkI7QUFDM0Isb0JBQVcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDckQsaUJBQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtJQUNWLGlCQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7QUFDNUMsQ0FBQyxDQUFDLENBQUMifQ==