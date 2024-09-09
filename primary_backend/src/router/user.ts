import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../types/config";

const router = Router();
const client = new PrismaClient();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parseData = SignupSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parseData.data.email
    }
  });

  if(userExists)
  {
    return res.status(403).json({
        message : "User already Exist"
    })
  }

  await prismaClient.user.create({
    data : {
        email : parseData.data.email,
        password : parseData.data.password,
        name     : parseData.data.name
    }
  })

  return res.json({
    message : "Please verify your account"
  })

});



router.post("/signin",async (req, res) => {
    const body=req.body
    const parseData = SigninSchema.safeParse(body)

    if(!parseData.success)
    return res.status(403).json({
        message : "Wrong email or password"
    })

    const userExists = await prismaClient.user.findFirst({
        where : {
            email    : parseData.data?.email,
            password : parseData.data?.password
        }
    })

    if(!userExists)
    return res.json({
        message : "Sorry credentials are incorrect"
})

    const token=jwt.sign({
        id : userExists.id
    },JWT_PASSWORD)
    
    res.json({
        token : token
    })
 

});

router.get("/user", authMiddleware, async(req, res) => {
    
    // @ts-ignore
    const id=req.id
    const user =await prismaClient.user.findFirst({
        where : {
            id : id
        },
        select : {
            name : true,
            email : true

        }
    })

    return res.json({
        user
    })
});

export const userRouter = router;
