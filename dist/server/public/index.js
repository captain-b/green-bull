"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoutes = void 0;
const express_middleware_1 = require("../../utils/express-middleware");
exports.PublicRoutes = (app) => {
    express_middleware_1.InitHandlebars(app);
    express_middleware_1.InitMiddleware(app);
    app.get('/', HomePage);
};
const HomePage = (req, res) => {
    res.render('home', { test: 'world' });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3B1YmxpYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1RUFBOEU7QUFFakUsUUFBQSxZQUFZLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDN0MsbUNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixtQ0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFBIn0=