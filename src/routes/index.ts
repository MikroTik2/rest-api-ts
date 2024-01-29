import express from 'express';
import rateLimit from 'express-rate-limit';
import userRouter from './api/user.apis';
import productRouter from './api/product.apis';

const router = express.Router();

const limiter = rateLimit({
     windowMs: 1 * 60 * 1000, // 1 минутка
     max: 30,
});

router.use(limiter);

router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;