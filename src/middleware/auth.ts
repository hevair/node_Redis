import { NextFunction, Request, Response } from "express";
import { decode, JwtPayload, verify } from "jsonwebtoken";


export async function  authentication(request: Request, response:Response, next: NextFunction){
    // console.log(request.body)

    const authHeader = request.headers.authorization;

    if(!authHeader){
       return response.status(401).end()
    }

    const [,token] = authHeader.split(" ");

    try{
        
       verify(token, `${process.env.JWT_SECRET}`);

        const {sub: userID}  = decode(token);

        request.userId = String(userID)

        return next();

    }catch(err){
        return response.status(401).end();
    }
}