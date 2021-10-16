import { compare, hash } from 'bcrypt'
import {Jwt, sign} from 'jsonwebtoken'
import {Request, Response} from 'express'
import { createConnectionPG } from '../postgres'

type User = {
    id: string;
    username: string;
    name: string;
    password: string;
}

export const LoginUserController ={
    handle: async (request: Request, response:Response) => {
        console.log(request.body)

        const { username, name, password } = request.body

        const clientConnection = await createConnectionPG()

       const {rows} = await clientConnection.query(
            `select * from users where username = $1 limit 1 `,
            [username]
        )
        console.log(rows)

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

        response.json({token: token})
    }
}