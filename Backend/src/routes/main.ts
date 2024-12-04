import express from 'express';
const router= express.Router();
import userRouter from './users';
import productRouter from './product';

router.use('/user',userRouter);
router.use('/product',productRouter);

export default router;





