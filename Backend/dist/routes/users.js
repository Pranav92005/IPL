"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const models_1 = require("../models");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authmiddleware_1 = require("../authmiddleware");
const createUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string(),
    iplteam: zod_1.default.string(),
});
//user signup
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPayload = createUserSchema.safeParse(req.body);
    if (!userPayload.success) {
        res.status(400).json("Invalid data");
        return;
    }
    const user = yield models_1.User.findOne({ email: req.body.email });
    if (user) {
        res.status(400).json("User already exists");
        return;
    }
    const hashedpassword = yield bcryptjs_1.default.hash(req.body.password, 10);
    try {
        const newuser = yield models_1.User.create({
            email: req.body.email,
            password: hashedpassword,
            name: req.body.name,
            iplteam: req.body.iplteam,
        });
        const token = jsonwebtoken_1.default.sign({ id: newuser._id }, config_1.JWT_SECRET);
        res.status(200).json({
            messge: "user created successfully",
            token: token
        });
    }
    catch (err) {
        res.status(500).json("Internal server error");
        return;
    }
}));
//user login
const usersigninschema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedpayload = usersigninschema.safeParse(req.body);
    if (!parsedpayload.success) {
        res.status(411).json({ message: "Invalid payload" });
        return;
    }
    const user = yield models_1.User.findOne({ email: req.body.email });
    if (!user) {
        res.status(403).json({ message: "User not found" });
        return;
    }
    const isvalidpassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!isvalidpassword) {
        res.status(403).json({ message: "Invalid password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userid: user._id }, config_1.JWT_SECRET);
    const team = user.iplteam;
    const name = user.name;
    res.json({
        message: "User signed in successfully",
        token: token,
        team: team,
        name: name
    });
}));
//team update
const updateschema = zod_1.default.object({
    email: zod_1.default.string().email(),
    iplteam: zod_1.default.string()
});
userRouter.put('/team', authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedpayload = updateschema.safeParse(req.body);
    if (!parsedpayload.success) {
        res.status(411).json({ message: "Invalid payload" });
        return;
    }
    const user = yield models_1.User.findOne({ email: req.body.email });
    if (!user) {
        res.status(403).json({ message: "User not found" });
        return;
    }
    const updateduser = yield models_1.User.findByIdAndUpdate(user._id, { iplteam: req.body.iplteam });
    if (!updateduser) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    res.json({ message: "Team updated successfully" });
}));
//add to cart route 
exports.default = userRouter;
