import { createLaptopService, deleteLaptopByIdService, getAllLaptopService, getLaptopByIdService, searchProductsService, updateLaptopByIdService } from "../services/product.service.js"

export const createLaptopController = async (req,res) => {
    try {
        const product = await createLaptopService(req.body);

        console.log(req.body);

        return res.status(201).json({
            message:"Product create successfully",
            data:product
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
}

export const getAllLaptopController = async (req,res) => {
    try {
        const products = await getAllLaptopService(req.body);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

export const searchProductsController = async (req,res) => {
    try {
        const query = req.query.q;

        const products = await searchProductsService(query);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}

export const getLaptopByIdController = async (req,res) => {
    try {
        const product = await getLaptopByIdService(req.params.id);

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

export const updateLaptopByIdController = async (req,res) => {
    try {
        const product = await updateLaptopByIdService(req.params.id,req.body);

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

export const deleteLaptopByIdController = async (req,res) => {
    try {
        const product = await deleteLaptopByIdService(req.params.id);

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}