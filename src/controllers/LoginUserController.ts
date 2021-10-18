import { compare, hash } from 'bcrypt'
import {Jwt, sign} from 'jsonwebtoken'
import {json, Request, Response} from 'express'
import { createConnectionPG } from '../postgres'
import { setRedis } from '../redis.config'

type User = {
    id: string;
    username: string;
    name: string;
    password: string;
}

export const LoginUserController ={
    handle: async (request: Request, response:Response) => {

        const { username, name, password } = request.body

        const clientConnection = await createConnectionPG()

       const {rows} = await clientConnection.query(
            `select * from users where username = $1 limit 1 `,
            [username]
        )

        if(!rows){
            return response.status(401).end()
        }

        const user: User = rows[0]


        const passwordMatch = await compare(password,user.password)

        if(!passwordMatch){
            return response.status(401).end()
        }

        const token = sign({username: user.username},`${process.env.JWT_SECRET}`,{
            subject: user.id
        })

        await setRedis(`user-${user.id}`, JSON.stringify(user))

        response.json({token: token})
    }
}