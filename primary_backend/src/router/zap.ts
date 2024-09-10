import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    //id we get from saved authMiddleware
    //@ts-ignore
    const id=req.id
  const body = req.body;
  const parseData = ZapCreateSchema.safeParse(body);

  if (!parseData.success) {
    return res.status(411).json({
      message: "Incorrect input",
    });
  }

  const zapId=await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId : id,
        triggerId: "",
        actions: {
          create: parseData.data.actions.map((x, index) => ({
            AvailableActionId: x.avaiableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        availableTriggerId: parseData.data.avaiableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id
  });

  return res.json({
    zapId
  })
});

router.get("/", authMiddleware, async (req, res) => {

    //@ts-ignore
    const id=req.id
    const zaps =await prismaClient.zap.findMany({
        where : {
            userId : id
        },
        include : {
            actions :{
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }

    })
    console.log("Zaps handler")
    return res.json({
        zaps 
    })
});

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id=req.id
    const zapId=req.params.zapId
    const zap =await prismaClient.zap.findFirst({
        where : {
            id :zapId,
            userId : id
        },
        include : {
            actions :{
                include : {
                    type : true
                }
            },
            trigger : {
                include : {
                    type : true
                }
            }
        }

    })
    console.log("Zaps handler")
    return res.json({
        zap
    })
})

export const zapRouter = router;
