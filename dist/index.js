"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConnectTOMongo_1 = __importDefault(require("./dbConfiguration/ConnectTOMongo"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/user", UserRoutes_1.default);
ConnectTOMongo_1.default.ConnectToDB();
app.listen(8080);
//# sourceMappingURL=index.js.map