import db from "../models/database.model.js";

const Product = db.products;
const sequelize = db.sequelize;

export const createLaptopService = async (
    {name,brand,model,serial,price,category}
) => {
    
    if (!brand || !serial) {
        throw new Error("Este campo es obligatorio.")
    }

    const newLaptop = await Product.create({
        name,
        brand,
        model,
        serial,
        category,
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

export const searchProductsService = async (q) => {

    const search = `
        SELECT 
            id,
            name,
            brand,
            serial,
            model,
            category,
            price,
            "createdAt",
            "updatedAt"
        FROM products
        WHERE name LIKE :search
    `

    // const search = `
    //     SELECT * FROM products
    //     WHERE name LIKE :search
    // `
    // const search = `
    //     SELECT * FROM products
    //     WHERE name LIKE '%${q}%'
    // `;

    const [results] = await sequelize.query(search, {
        replacements: {
            search: `%${q}%`
        }
    });
    return results;
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