import {Router} from 'express';

import {createLaptopController, getAllLaptopController, getLaptopByIdController, updateLaptopByIdController, deleteLaptopByIdController, searchProductsController} from '../controllers/product.controller.js';

const router = Router();

router.post('/products/',createLaptopController);

router.get('/products/',getAllLaptopController);

router.get('/products/search',searchProductsController);

router.get('/products/:id',getLaptopByIdController);

router.put('/products/:id',updateLaptopByIdController);

router.delete('/products/:id',deleteLaptopByIdController);


export default router;
