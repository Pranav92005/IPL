"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
}
// Connect to MongoDB and handle errors
mongoose_1.default.connect(databaseUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
    },
    iplteam: {
        type: String,
        required: true,
        enum: ['RCB', 'CSK', 'MI', 'KKR', 'DC', 'RR', 'SRH', 'LSG', 'PBKS', 'GT'],
    },
    cart: [{
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }],
    orders: [{
            orderDate: {
                type: Date,
                default: Date.now,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            status: {
                type: String,
                default: 'Pending',
                enum: ['Pending', 'Shipped', 'Delivered'],
            },
            products: [{
                    productId: {
                        type: mongoose_1.default.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: [1, 'Quantity must be at least 1'],
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                }],
        }],
});
// Define the product schema
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0'],
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: [0, 'Stock count cannot be negative'],
    },
    iplteam: {
        type: String,
        required: true,
        enum: ['RCB', 'CSK', 'MI', 'KKR', 'DC', 'RR', 'SRH', 'LSG', 'PBKS', 'GT'],
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
