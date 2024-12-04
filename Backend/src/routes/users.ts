import express from 'express';
const userRouter = express.Router();
import { User } from '../models';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import bycrypt from 'bcryptjs';
import {authMiddleware} from '../authmiddleware';




const createUserSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string(),
    iplteam: zod.string(),

});







//user signup
userRouter.post('/signup', async (req: express.Request, res: express.Response): Promise<void> => {
    const userPayload= createUserSchema.safeParse(req.body);
    if(!userPayload.success){
     res.status(400).json("Invalid data");
     return;
    }
const user= await User.findOne({email:req.body.email});

if(user){
    res.status(400).json("User already exists");
    return;
}

    const hashedpassword= await bycrypt.hash(req.body.password,10);

        try{
            const newuser= await User.create({
                email:req.body.email,
                password:hashedpassword,
                name:req.body.name,
                iplteam:req.body.iplteam,
            })
            const token= jwt.sign({id:newuser._id},JWT_SECRET);
            res.status(200).json({
                messge:"user created successfully",
                token:token});
                
        
            
        }
        catch(err){
            res.status(500).json("Internal server error");
            return;
        }
        

    

    




});



//user login
const usersigninschema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

userRouter.post('/signin', async (req: express.Request, res: express.Response): Promise<void> => {
const parsedpayload=usersigninschema.safeParse(req.body);
if(!parsedpayload.success){
    res.status(411).json({message:"Invalid payload"});
return;}
    const user=await User.findOne({email:req.body.email});

    if (!user) {
        res.status(403).json({ message: "User not found" });
        return;
    }
    const isvalidpassword = await bycrypt.compare(req.body.password, user.password);
    if (!isvalidpassword) {
         res.status(403).json({message:"Invalid password"});
         return;
    }

    const token=jwt.sign({userid:user._id},JWT_SECRET);
    const team=user.iplteam;
    const name=user.name;
    res.json({
        message:"User signed in successfully",
        token:token,
        team:team,
        name:name
    })})


    //team update
    const updateschema=zod.object({
    email:zod.string().email(),
        iplteam:zod.string()
    });

    userRouter.put('/team', authMiddleware ,async(req:express.Request,res:express.Response)=>{
        const parsedpayload=updateschema.safeParse(req.body);
        if(!parsedpayload.success){
            res.status(411).json({message:"Invalid payload"});
        return;}
            const user=await User.findOne({email:req.body.email});
        
            if (!user) {
                res.status(403).json({ message: "User not found" });
                return;
            }
            const updateduser=await User.findByIdAndUpdate(user._id,{iplteam:req.body.iplteam});
            if(!updateduser){
                res.status(500).json({message:"Internal server error"});
            return;}

            res.json({message:"Team updated successfully"});
        
    });




    //add to cart route 

    


    






    


export default userRouter;
