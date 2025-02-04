import { Request, Response } from "express";
import User from "../models/user"
import jwt from "jsonwebtoken";
export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    let user = await User.findOne({ email });

    if (user) {

      return res.status(200).json({ message: "Login successful", user });
    }

    user = new User({
      email,
      password,
      firstname,
      lastname,
    });

    await user.save();
    
    const token = jwt.sign(
        { UserID: user.id },
        process.env.JWT_SECRET_TOKEN as string, 
        { expiresIn: "1h" } 
      );
      res.cookie("auth_token", token, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === "production",  
        maxAge: 24 * 60 * 60 * 1000,  
      });
   return  res.sendStatus(200);
  } catch (error) {
   return  res.status(500).json({ message: "Internal server error", error });
  }
};
