import db from "../models/database.model.js";

const Product = db.products;

export const createLaptopService = async (
    {name,brand,model,serial,price}
) => {
    
    if (!brand || !serial) {
        throw new Error("Este campo es obligatorio.")
    }

    const newLaptop = await Product.create({
        name,
        brand,
        model,
        serial,
        price
    })

    return newLaptop;
} 

export const getAllLaptopService = async () => {
    const computers = await Product.findAll();

    if (computers.length === 0) {
        throw new Error("Not found computers");
    } else {
       return computers;
    }
}

export const getLaptopByIdService = async (id) => {
    const computer = await Product.findByPk(id);

    if (!computer) {
        throw new Error("Computer not found");
    } else {
        return computer;
    }
}

export const updateLaptopByIdService = async (id,data) => {
    const computer = await Product.findByPk(id);

    if (!computer) {
        throw new Error("Computer not found");
    }

    await computer.update(data);

    return computer;
}

export const deleteLaptopByIdService = async (id) => {
    const computer = await Product.findByPk(id);

    if (!computer) {
        throw new Error("Computer not found");
    }

    await computer.destroy();

    return {
        message: "Computer deleted successfully"
    };
}