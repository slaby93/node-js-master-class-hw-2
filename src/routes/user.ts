import * as http from 'http'
import { RouteHandler, RouteOutput, Endpoint } from './../interfaces'
import Method from './../consts/methods'
import User from './../models/user'
import randomStringGenerator from './../utils/randomStringGenerator'

const handler: Endpoint = {
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
    [Method.PUT]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        try {
            const {
                id,
                name,
                email,
                address
            } = bodyData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Invalid id field' } }
            }
            const user = new User()
            user.id = id
            await user.load()
            if (name) {
                user.name = name
            }
            if (address) {
                user.address = address
            }
            if (email) {
                user.email = email
            }
            await user.update()
            return { responseStatus: 200, response: { user } }
        } catch (error) {
            return { responseStatus: 500, response: { err: 'Error while updating user data' } }
        }
    },
    [Method.DELETE]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        try {
            const { id } = bodyData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Invalid id field' } }
            }
            const user = new User()
            user.id = id
            await user.delete()
            return { responseStatus: 200 }

        } catch (error) {
            return { responseStatus: 500, response: { err: 'Error while deleting user' } }
        }

    },
}

export default handler