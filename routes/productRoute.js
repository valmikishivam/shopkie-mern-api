import express from 'express';
import { displayProducts, products,related,singleProduct } from '../controllers/ProductController.js'
const productRoutes=express.Router();


productRoutes.post('/add',products)
productRoutes.get('/',displayProducts);
productRoutes.get('/related',related)
productRoutes.get('/:id',singleProduct);

export default productRoutes;