import express ,{ Request, Response }  from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
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
        
        const imageURLs = await uploadImages(imageFiles);
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

router.get("/",verifyToken,async(req:Request,res:Response)=>{
 
    try {
           const hotels = await Hotel.find({ userId: req.userId });
          // console.log("Hotels:",req.userId);
           await res.json(hotels); 
    } catch (error) {
        res.status(500).json({message:"Finding your hotels failed"});
    }
});
router.get("/:id",verifyToken,async(req:Request,res:Response)=>{
   // /api/my-hotels/:12345
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne(
            { 
                 _id:id,
                userId: req.userId,
            }
        );
        if(hotel){
            res.json(hotel);
        }else{
            res.status(404).json({message:"Hotel not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Finding hotel failed"});
    }
}
);
router.put("/:hotelId",verifyToken,upload.array("imageFiles"),
async(req:Request,res:Response)=>{
    
    try {
        const updatedHotel:HotelType = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await Hotel.findOneAndUpdate(
            { 
                _id:req.params.hotelId,
                userId: req.userId,
            },
            updatedHotel,
            { new: true }
        );
        if(!hotel){
            return res.status(404).json({message:"Hotel not found"});
        }
        const files = req.files as Express.Multer.File[];
        const updatedImageURLs = await uploadImages(files);
        hotel.imageUrls = [
            ...updatedImageURLs,
            ...(updatedHotel.imageUrls||[]),];
        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({message:"Updating hotel failed"});
    }
}
);
// router.delete("/:hotelId",verifyToken,async(req:Request,res:Response)=>{
//     const id = req.params.hotelId.toString();
//     try {
//         const hotel = await Hotel.findOneAndDelete(
//             { 
//                 _id:id,
//                 userId: req.userId,
//             }
//         );
//         if(hotel){
//             res.json(hotel);
//         }else{
//             res.status(404).json({message:"Hotel not found"});
//         }
//     } catch (error) {
//         res.status(500).json({message:"Deleting hotel failed"});
//     }
// }
// );


async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageURLs = await Promise.all(uploadPromises);
    return imageURLs;
}
export default router;