import express from 'express'
import { PrismaClient } from '@prisma/client'

const app=express()
const client=new PrismaClient()

app.use(express.json())

app.listen(5000 ,() => {
    console.log("running")
})


app.get('/', function (req, res) {  
  res.send('Welcome to my world who are u mister');  
}); 

app.get('/hooks/catch',(req,res) =>{
    res.send('hi')
})

app.post('/hooks/catch/:userId/:zapId',async(req,res)=>{
    const userId=req.params.userId
    const zapId=req.params.zapId
    const body=req.body

    client.$transaction(async tx =>{
        const run=await tx.zapRun.create({
            data : {
                zapId : zapId,
                metadata : body
            }
        })

        await tx.zapRunOutBox.create({
            data : {
                zapRunId : run.id
            }
        })
    })

    console.log(userId+","+zapId)
    res.send("Successful")
})

