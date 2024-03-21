import { Request, Response } from "express";
import Products from "../../models/products";

interface queryInterface {
    featured?: boolean;
}

const getAllProducts = async (req: Request, res: Response) => {

    const { featured } = req.query;
    const queryObject: queryInterface = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    const products = await Products.find(queryObject);
    if (!products) {
        throw new Error('Doesnt exist')
    }
    res.status(200).send(products);

}

const getAllProductsStatic = async (req: Request, res: Response) => {
    const products = await Products.find({}).sort('name');
    res.status(200).send({ products });
}

export { getAllProducts, getAllProductsStatic }