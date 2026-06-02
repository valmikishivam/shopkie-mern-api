import express from 'express';
import { products } from '../controllers/ProductController.js'
const productRoutes=express.Router();


productRoutes.post('/add',products)

export default productRoutes;
