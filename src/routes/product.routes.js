import {Router} from 'express';

import {createLaptopController, getAllLaptopController, getLaptopByIdController, updateLaptopByIdController, deleteLaptopByIdController} from '../controllers/product.controller.js';

const router = Router();

export const productRoutes = () => {
    router.post('/products/laptop',createLaptopController);
    router.get('/products/laptop',getAllLaptopController);
    router.get('/products/laptop/:id',getLaptopByIdController);
    router.put('/products/laptop/:id',updateLaptopByIdController);
    router.delete('/products/laptop/:id',deleteLaptopByIdController);
}

productRoutes();

export default router;
