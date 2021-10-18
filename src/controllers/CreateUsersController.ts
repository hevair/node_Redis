import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { Request, Response } from "express";
import { createConnectionPG } from "../postgres";

const CreateUsersController = {

    handle: async (request: Request, response: Response) => {
        console.log(request.body)

        const { username, name, password } = request.body

        const clienteConnection = await createConnectionPG()

        const {rows} = await clienteConnection.query(
            `select * from users where username = $1 limit 1`,
            [username]
        )

        const userExists = rows[0]

        if(userExists){
            response.status(400).json({error: 'User already exists'})
        }

        const hashPassword = await bcrypt.hash(password,8)

        console.log(hashPassword)

        const id = uuid()

       await clienteConnection.query(
            `insert into users (id, name, username, password) values($1, $2, $3, $4)
            `,[id, name, username, hashPassword]
        )

        response.send()
    }

}

export { CreateUsersController }