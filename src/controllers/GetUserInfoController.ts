import { Request, Response, Router } from "express";
import { createConnectionPG } from "../postgres";

export const GetUserInforController = {
    handle: async (request: Request, response:Response) =>{
        
        const {userId} = request.body
        console.log(userId)
        
        const clintConnection = await createConnectionPG()

        const {rows} = await clintConnection.query(
            `select * from users where id = $1 limit 1`,
            [userId]
        )
        console.log(rows)
        
        const userExists = rows[0]

        if(!userExists){
            return response.status(401).end();
        }

        console.log(userExists)

        return response.status(200).send(userExists)
    }
}