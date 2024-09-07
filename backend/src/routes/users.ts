import express,{Request,Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from users route');
});
router.post('/register',async (req: Request, res:Response) => {
  try {
    let user = await User.findOne({ email   : req.body.email, });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string,{expiresIn:"1d",});

//end protection secure:true for https
    res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});