import  express  from 'express';
import { Product } from '../models';
const productRouter = express.Router();
import multer from 'multer';
import zod from 'zod';
import { authMiddleware } from '../authmiddleware';





const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Save to "uploads" folder
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique name
  });
  const upload = multer({ storage });



  productRouter.post("/products", upload.single("image"), async (req, res) => {
    
    try {
      const { file } = req;
      const { name, price,description,category,countInStock,iplteam } = req.body;
  
      if (!file) {
         res.status(400).json({ message: "Image is required" });
         return;
      }
  
      // Generate the image URL
      const image = `http://localhost:3000/uploads/${file.filename}`;
  
      // Save product details, including the image URL
      const newProduct =await Product.create({
        name,
        price,
        image,
        description,
        category,
        countInStock,
        iplteam,

      });
  
      
       res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
      console.error("Error saving product:", error);
       res.status(500).json({ message: "Internal Server Error" });
       return;
    }
  });

  











productRouter.get('/allProduct',authMiddleware,async (req,res)=>{
    try {
        // Fetch all products from the database
        const products = await Product.find();
    
        // Send the products as a JSON response
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }

}
    )
    



    productRouter.get('/:id',authMiddleware,async (req,res)=>{

        try {
            // Fetch the product with the given ID
            const product = await Product.findById(req.params.id);
        
            // If the product doesn't exist, return a 404 error
            if (!product) {
              res.status(404).json({ message: "Product not found" });
              return;
            }
        
            // Send the product as a JSON response
            res.status(200).json(product);
          } catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }

    })





export default productRouter;