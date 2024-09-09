import express from "express"
import { userRouter } from "./router/user"
import { zapRouter } from "./router/zap"
import cors from "cors"

const app=express()

const PORT=3000
app.use(express.json())
app.use(cors())

app.listen(PORT,()=>{
    
    console.log("Running on PORT "+PORT)
})

app.use("/api/v1/user",userRouter)
app.use("/api/v1/zap",zapRouter)

