"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitEnvVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Initialises our env variables.
 */
exports.InitEnvVars = () => {
    if (process.env.NODE_ENV === 'local-dev') {
        dotenv_1.default.config();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZG90ZW52L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUU1Qjs7R0FFRztBQUNVLFFBQUEsV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUM1QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFdBQVcsRUFBRTtRQUN0QyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyxDQUFBIn0=