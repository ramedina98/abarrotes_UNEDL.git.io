import express from 'express';
import { 
    getProducts, 
    getProductInfo
} from '../controller/controller.js';
import { get } from 'http';

const router = express.Router();

//route, get all the info...
router.get('/products', getProducts);
router.get('/details/:id', getProductInfo);
export default router