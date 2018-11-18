import * as http from 'http'
import { RouteHandler, RouteOutput } from './../interfaces'
import Method from './../consts/methods'
import User from './../models/user'
import randomStringGenerator from './../utils/randomStringGenerator'

const handler: { [index: string]: RouteHandler } = {
    [Method.GET]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const { id } = queryParamsData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Id is not provided' } }
            }

            const user = new User()
            user.id = id
            await user.load()
            console.log({ user })
            return { responseStatus: 200, response: user }

        } catch {
            return { responseStatus: 500, response: { err: 'Error while getting user' } }
        }
    },
    [Method.POST]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const {
                name,
                email,
                address
            } = bodyData
            const newUser = new User()
            newUser.name = name
            newUser.email = email
            newUser.address = address
            newUser.id = randomStringGenerator(20)
            await newUser.save()

            return { responseStatus: 200, response: newUser }
        } catch {
            return { responseStatus: 500, response: { err: 'Error while creating user' } }
        }
    },
    [Method.PUT]: (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        setTimeout(() => {
            res.setHeader('Content-Type', 'application/json')
            resolve({ responseStatus: 400, response: 'test' })
        }, 1000)
    }),
    [Method.DELETE]: (path: string, query: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        setTimeout(() => {
            res.setHeader('Content-Type', 'application/json')
            resolve({ responseStatus: 400, response: 'test' })
        }, 1000)
    }),
}

export default handler