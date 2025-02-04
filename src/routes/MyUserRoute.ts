import express, { Request, Response } from "express";
import { UserLogin } from "../controllers/MyUserController";


const router = express.Router();

router.post("/register", UserLogin);

export default router;
