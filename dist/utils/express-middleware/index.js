"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitHandlebars = exports.InitMiddleware = void 0;
const express_1 = __importStar(require("express"));
const consolidate_1 = __importDefault(require("consolidate"));
const path_1 = __importDefault(require("path"));
exports.InitMiddleware = (app) => {
    app.use(express_1.json());
    app.use(express_1.urlencoded({ extended: false }));
};
exports.InitHandlebars = (app) => {
    app.engine('html', consolidate_1.default.handlebars);
    app.set('view engine', 'html');
    app.set('views', path_1.default.join(__dirname, '../../server/public/views/html'));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../server/public/views')));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZXhwcmVzcy1taWRkbGV3YXJlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBK0Q7QUFDL0QsOERBQStCO0FBQy9CLGdEQUF3QjtBQUVYLFFBQUEsY0FBYyxHQUFHLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQy9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztJQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLG9CQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQTtBQUVZLFFBQUEsY0FBYyxHQUFHLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLHFCQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUUsQ0FBQyxDQUFBIn0=