import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs"

const TOPIC_NAME="zap-events"
const client = new PrismaClient()

const kafka = new Kafka({
    clientId : 'outbox-processor',
    brokers : ['localhost:9092']
})

async function main()
{
    const producer = kafka.producer();
    await producer.connect();

    while(1)
    {
       const pendingRows = await client.zapRunOutBox.findMany({
        where : {},
        // take only at max 10 rows from zapRunOutBox at a time
        take : 10
       })

       // kafka me pending rows daalne ko
        producer.send({
            topic : TOPIC_NAME,
            messages : 
                pendingRows.map( r => ({
                    value : r.zapRunId
                }) )       
        }) 
        
        //once the pending rows pushed to kafka it get deleted from zapRunOutBox
        await client.zapRunOutBox.deleteMany({
            where : {
                id : {
                    in : pendingRows.map(x => x.id)
                }
            }
        })
    }
}

main()