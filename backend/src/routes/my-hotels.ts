import express ,{ Request, Response }  from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
const router = express.Router();
const storage= multer.memoryStorage();
require('dotenv').config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
});

router.post('/',verifyToken,[
    body("name").notEmpty().withMessage('Name is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("country").notEmpty().withMessage('Country is required'),
    body("description").notEmpty().withMessage('Description is required'),
    body("type").notEmpty().withMessage('Type is required'),
    body("adultCount").notEmpty().isNumeric().withMessage('Adult count is required'),
    body("childCount").notEmpty().isNumeric().withMessage('Child count is required'),
    body("facilities").notEmpty().isArray().withMessage('Facilities is required'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required'),
    body("starRating").notEmpty().isNumeric().withMessage('Star rating is required')

],upload.array("imageFiles",6),async (req:Request, res:Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        if(!imageFiles){
            return res.status(400).json({message:"No files uploaded"})
        }
        const newHotel:HotelType = req.body;
        //upload images to cloudinary
        
        const uploadPromises = imageFiles.map(async(image)=>{
            const b64 =Buffer.from(image.buffer).toString("base64");
            let dataURI="data:"+image.mimetype+";base64,"+b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
            // const dataURI = `data:${image.mimetype};base64,${b64}`;
            // const uploadResult = await cloudinary.v2.uploader.upload(dataURI);
            // return uploadResult.secure_url;
        });
        const imageURLs = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageURLs;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new Hotel(newHotel);
        await hotel.save();
        res.status(201).json(hotel);
        
    } catch (error) {
        console.log("Error creating hotel:",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}
);
export default router;