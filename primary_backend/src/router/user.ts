import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignupSchema } from "../types";

const  router=Router()

router.post('/signup',(req,res)=>{
    const body=req.body.userName
    const parseData = SignupSchema.safeParse(body)
})

router.post('/signin',(req,res) =>{
    console.log("signin handler")
})

router.get("/user",authMiddleware,(req,res) =>{
    res.send("hi")
    console.log("signup handler")
})

export const userRouter=router