import { Request, Response } from "express";
import Products from "../../models/products";

const getAllProducts = async (req: Request, res: Response) => {
    const products = await Products.find(req.query);
    res.status(200).send(products);

}

const getAllProductsStatic = async (req: Request, res: Response) => {
    const products = await Products.find({});
    res.status(200).send({ products });
}

export { getAllProducts, getAllProductsStatic }