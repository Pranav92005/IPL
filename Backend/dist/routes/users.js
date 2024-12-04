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
const bcrypt_1 = __importDefault(require("bcrypt"));
const authmiddleware_1 = require("../authmiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
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
    const hashedpassword = yield bcrypt_1.default.hash(req.body.password, 10);
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
    const isvalidpassword = yield bcrypt_1.default.compare(req.body.password, user.password);
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
const cartschema = zod_1.default.object({
    email: zod_1.default.string().email(),
    productid: zod_1.default.string(),
});
userRouter.put('/addtocart', authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedPayload = cartschema.safeParse(req.body);
    if (!parsedPayload.success) {
        res.status(411).json({ message: "Invalid payload" });
    }
    try {
        // Find the user by email
        const user = yield models_1.User.findOne({ email: req.body.email });
        if (!user) {
            res.status(403).json({ message: "User not found" });
        }
        // Ensure `productid` is a valid ObjectId
        const productId = new mongoose_1.default.Types.ObjectId(req.body.productid);
        // Check if the product is already in the user's cart
        if (user) {
            const isInCart = user.cart.some((item) => item.productId.toString() === productId.toString());
            if (isInCart) {
                res.status(409).json({ message: "Product is already in the cart" });
                return;
            }
            // Update the user's cart by adding the product object
            const updatedUser = yield models_1.User.findByIdAndUpdate(user._id, { $push: { cart: { productId } } }, // Push object with productId field
            { new: true } // Return the updated document
            );
            if (!updatedUser) {
                res.status(500).json({ message: "Internal server error" });
                return;
            }
            // Respond with success message and updated cart
            res.json({
                message: "Product added to cart successfully",
                cart: updatedUser.cart,
            });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = userRouter;
