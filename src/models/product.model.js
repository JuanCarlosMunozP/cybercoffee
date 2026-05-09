const productModel = (sequelize,Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type:Sequelize.STRING
        },
        brand: {
            type:Sequelize.STRING
        },
        serial: {
            type:Sequelize.STRING
        },
        model: {
            type:Sequelize.STRING
        },
        category: {
            type:Sequelize.STRING
        },
        price: {
            type:Sequelize.FLOAT
        }
    })

    return Product;
}

export default productModel;