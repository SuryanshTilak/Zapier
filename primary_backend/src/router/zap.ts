import {Router} from "express"
import { authMiddleware } from "../middleware"

const router = Router()

router.post("/",authMiddleware,(req,res) => {
    console.log("crate a zap")
})

router.get("/",authMiddleware ,(req,res) => {
    console.log("signin handler")
    res.send('hi')
})

router.get("/:zapId",authMiddleware,(req,res) => {
    console.log("signin handler")
})

export const zapRouter=router