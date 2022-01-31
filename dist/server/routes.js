"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenBullRoutes = void 0;
const express_1 = __importDefault(require("express"));
const public_1 = require("./public");
exports.GreenBullRoutes = () => {
    const app = express_1.default();
    public_1.PublicRoutes(app);
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQTZDO0FBQzdDLHFDQUFzQztBQUV6QixRQUFBLGVBQWUsR0FBRyxHQUFnQixFQUFFO0lBQzdDLE1BQU0sR0FBRyxHQUFnQixpQkFBTyxFQUFFLENBQUE7SUFFbEMscUJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMsQ0FBQSJ9