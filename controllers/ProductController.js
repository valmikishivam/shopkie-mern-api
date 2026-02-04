import productModel from '../models/ProductData.model.js'
import { nanoid } from 'nanoid'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { skipMiddlewareFunction } from 'mongoose';
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
})

export const products = async (req, res) => {
    try {
        const { title, brand, slug, price, rating, category, description } = req.body;
        const posterfile = req.files.poster;
        const uploadedPoster = await cloudinary.uploader.upload(posterfile.tempFilePath)
        const images = req.files.images
        const imagesUrl = []
        if (images) {
            const imagesArray = Array.isArray(images) ? images : [images];
            for (const img of imagesArray) {
                const imgRes = await cloudinary.uploader.upload(img.tempFilePath);
                imagesUrl.push(imgRes.secure_url)
            }
        }
        let finalImages = imagesUrl.length ? [uploadedPoster.secure_url, ...imagesUrl] : [uploadedPoster.secure_url];

        const validslug = slug.replace(' ', '-');
        const finalCategory = category.split('-')
        const productData = {
            uid: nanoid(10),
            title,
            price,
            poster: uploadedPoster.secure_url,
            slug: validslug,
            images: finalImages,
            rating,
            category: finalCategory,
            description
        }
        if (brand) {
            productData.brand = brand;
        }
        await productModel.create(productData);
        res.status(201).json({ status: true, msg: "product upload sucessfully" })


    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "server error" })

    }

}

export const displayProducts = async (req, res) => {
    try {
        const { q, page } = req.query

        let query = {}
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: "i" } },
                { brand: { $regex: q, $options: "i" } },
                { slug: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } }
            ];
        }

        if (req.query.category) query.category = req.query.category
        
        const totalProduct = await productModel.countDocuments(query);
        const pageNo = Number(page) || 1;
        const limit = 25
        const skip = (pageNo - 1) * limit;
        const totalPage = Math.ceil(totalProduct / limit)
        const products = await productModel.find(query).select('-_id -__v').skip(skip).limit(limit);

        if (products.length == 0) {
            res.status(400).json({ status: false, msg: "no products found" })
        }
        const productsCount = products.length
        res.status(200).json({ status: true, products, pageNo, totalPage, productsCount, totalProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "server error" })
    }
}



export const singleProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const proData = await productModel.findOne({ uid: id }).select('-_id -__v')
        res.status(200).json({ status: true, msg: "here your product", proData })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "server error" })
    }
}
export const related = async (req, res) => {
    try {
        const { category } = req.query;



        const products = await productModel.find({ category: category }).select('-_id -__v').skip().limit(6);
        res.status(200).json({ msg: "releted api call", products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "server error" })
    }

}
