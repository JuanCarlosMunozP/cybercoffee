import db from '../models/database.model.js';

const sequelize = db.sequelize;

export const getProfileService = async (id) => {

    // const search = `
    //     SELECT * FROM users 
    //     WHERE id='${id}'
    // `

    const search = `
        SELECT 
            id,
            name,
            email,
            "createdAt"
        FROM users
        WHERE id = :id
    `

    const results = await sequelize.query(search, {
        replacements: {
            id:Number(id)
        }
    });

    return results;
}