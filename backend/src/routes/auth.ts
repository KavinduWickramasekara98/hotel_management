import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router =express.Router();

router.get('/', (req, res) => {
  res.send('Hello from users route');
});
router.post("/login",[
    check("email","Please include a valid email").isEmail(),
    check("password","Password with 6 letters required").isLength({min:6})
    ],async (req:Request,res:Response)=>{   
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password} = req.body;
        console.log(email,password);
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message:"Invalid Credentials"});
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid Credentials"});
            }
            const token = jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});
            res.cookie("auth_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({userId:user._id});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Server Error"});
        }
    } 
);   
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId});
});

router.post("/logout", (req: Request, res: Response) => {
    // res.clearCookie("auth_token");
    // res.status(200).send({ message: "Logged out" });

    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
    });

export default router;
