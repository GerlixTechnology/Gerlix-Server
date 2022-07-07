const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category) => {
	const sql = `
    SELECT
        P.id,
        P.name,
        P.supplier,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
        `;
	return db.manyOrNone(sql, id_category);
};

Product.create = (product) => {
	const sql = `
    INSERT INTO
        products(
            name,
            supplier,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;
	return db.oneOrNone(sql, [
		product.name,
		product.supplier,
		product.description,
		product.price,
		product.image1,
		product.image2,
		product.image3,
		product.id_category,
		new Date(),
		new Date(),
	]);
};

Product.update = (product) => {
	const sql = `
    UPDATE
        products
    SET
        name = $2,
        supplier = $3,
        description = $4,
        price = $5,
        image1 = $6,
        image2 = $7,
        image3 = $8,
        id_category = $9,
        updated_at = $10
    WHERE
        id = $1
    `;
	return db.none(sql, [
		product.id,
		product.name,
		product.supplier,
		product.description,
		product.price,
		product.image1,
		product.image2,
		product.image3,
		product.id_category,
		new Date(),
	]);
};

module.exports = Product;
