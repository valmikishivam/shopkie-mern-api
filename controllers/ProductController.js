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



