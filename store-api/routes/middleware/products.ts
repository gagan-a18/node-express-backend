import { Request, Response } from "express";
import Products from "../../models/products";

const operatorMap = {
    ">": "$gt",
    ">=": "$gte",
    "<": "$lt",
    "<=": "$lte",
}

const options = ['price', 'rating']

interface queryType {
    [key: string]: { [value: string]: Number } | boolean
}

const getAllProducts = async (req: Request, res: Response) => {

    const { featured, sort, numericFilters } = req.query;
    const queryObject: queryType = {};
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    if (typeof featured === 'string') {
        queryObject['featured'] = featured === 'true' ? true : false;
    }

    if (typeof numericFilters === 'string') {
        const regex: RegExp = /\b(>|>=|<|<=)\b/g;
        let filters: string = numericFilters.replace(regex, (match) => `-${operatorMap[match as keyof typeof operatorMap]}-`);
        const filter: void = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    let products = Products.find(queryObject).skip(skip).limit(limit);

    if (typeof sort === 'string') {
        const sortList = sort.split(',').join(' ');
        products = products.sort(sortList);
    }

    const result = await products;

    if (!products) {
        throw new Error('Doesnt exist')
    }
    res.status(200).send(result);
}

const getAllProductsStatic = async (req: Request, res: Response) => {
    const products = await Products.find({})
    res.status(200).send({ products });
}

export { getAllProducts, getAllProductsStatic }