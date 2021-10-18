import { Request, Response, Router } from "express";
import { createConnectionPG } from "../postgres";
import { getRedis } from "../redis.config";


export const GetUserInforController = {
    handle: async (request: Request, response:Response) =>{
        
        const {userId} = request     
        
        const clintConnection = await createConnectionPG()

        console.time()

         const userRedis = await getRedis(`user-${userId}`)
         const user = JSON.parse(userRedis)

        // const {rows} = await clintConnection.query(
        //     `select * from users where id = $1 limit 1`,
        //     [userId]
        // )
        
        console.timeEnd()
        
        return response.status(200).json(user)
    }
}