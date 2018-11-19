import * as http from 'http'
import { Endpoint, RouteOutput } from '../interfaces';
import Methods from '../consts/methods';
import { checkToken } from '../utils/routes';
import ShoppingCart from '../models/ShoppingCart';
import Order from '../models/Order';
import randomStringGenerator from '../utils/randomStringGenerator';

const handler: Endpoint = {
    [Methods.GET]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const { id } = queryParamsData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Id is not provided' } }
            }
            const isValid = await checkToken(req, id)
            if (!isValid) {
                return { responseStatus: 401, response: { err: 'Not authorized' } }
            }
            const order = new Order()
            order.userId = id
            await order.load()


            return { responseStatus: 200, response: { order } }

        } catch {
            return { responseStatus: 500, response: { err: 'Error while getting order' } }
        }
    },
    [Methods.POST]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const { id } = bodyData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Id is not provided' } }
            }
            const isValid = await checkToken(req, id)
            if (!isValid) {
                return { responseStatus: 401, response: { err: 'Not authorized' } }
            }
            const cart = new ShoppingCart()
            cart.userId = id
            await cart.load()
            const order = new Order()
            order.cart = cart
            order.userId = id
            order.id = randomStringGenerator(20)
            await order.save()
            return { responseStatus: 200, response: { order } }

        } catch (error) {
            return { responseStatus: 500, response: { err: 'Error while creating order' } }
        }
    },
    [Methods.PUT]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const { id } = bodyData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Id is not provided' } }
            }
            const isValid = await checkToken(req, id)
            if (!isValid) {
                return { responseStatus: 401, response: { err: 'Not authorized' } }
            }



            return { responseStatus: 200 }

        } catch {
            return { responseStatus: 500, response: { err: 'Error while updating order' } }
        }
    },
    [Methods.DELETE]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
        res.setHeader('Content-Type', 'application/json')
        try {
            const { id } = bodyData
            if (!id) {
                return { responseStatus: 400, response: { err: 'Id is not provided' } }
            }
            const isValid = await checkToken(req, id)
            if (!isValid) {
                return { responseStatus: 401, response: { err: 'Not authorized' } }
            }

            const order = new Order()
            order.userId = id
            await order.delete()

            return { responseStatus: 200 }

        } catch {
            return { responseStatus: 500, response: { err: 'Error while removing order' } }
        }
    },
}

export default handler