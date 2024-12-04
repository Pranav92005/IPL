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
const models_1 = require("../models");
const productRouter = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const authmiddleware_1 = require("../authmiddleware");
// const createProductSchema = zod.object({
//     image: zod.string(),
//   name: zod.string(),
//   price: zod.number().positive(),
//   description: zod.string(),
//   category: zod.string(),
//   countInStock: zod.number().positive(),
//   iplteam: zod.string(),
// });
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Save to "uploads" folder
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique name
});
const upload = (0, multer_1.default)({ storage });
productRouter.post("/products", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file } = req;
        const { name, price, description, category, countInStock, iplteam } = req.body;
        if (!file) {
            res.status(400).json({ message: "Image is required" });
            return;
        }
        // Generate the image URL
        const image = `http://localhost:3000/uploads/${file.filename}`;
        // Save product details, including the image URL
        const newProduct = yield models_1.Product.create({
            name,
            price,
            image,
            description,
            category,
            countInStock,
            iplteam,
        });
        res.status(201).json({ message: "Product created", product: newProduct });
    }
    catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}));
productRouter.get('/allProduct', authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all products from the database
        const products = yield models_1.Product.find();
        // Send the products as a JSON response
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
productRouter.get('/:id', authmiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the product with the given ID
        const product = yield models_1.Product.findById(req.params.id);
        // If the product doesn't exist, return a 404 error
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        // Send the product as a JSON response
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = productRouter;
