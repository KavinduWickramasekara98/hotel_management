import express,{Request,Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from users route');
});


router.get('/me',verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});
//api/users/register
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
    res.cookie('auth_token', token, { 
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day 
    });
    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;