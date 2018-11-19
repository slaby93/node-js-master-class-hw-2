import { IncomingMessage, ServerResponse } from "http";
import { Endpoint, RouteOutput } from "../interfaces";
import Methods from "../consts/methods";
import { checkToken } from "../utils/routes";
import randomStringGenerator from "../utils/randomStringGenerator";
import ShoppingCart, { IShoppingCartItem } from "../models/ShoppingCart";


const handler: Endpoint = {
  [Methods.GET]: async (bodyData: any, queryParamsData: any, req: IncomingMessage, res: ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = queryParamsData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const isValid = await checkToken(req, id)
      if (!isValid) {
        return { responseStatus: 401, response: { err: 'Not authorized' } }
      }
      const cart = new ShoppingCart()
      cart.userId = id
      await cart.load()
      return { responseStatus: 200, response: { cart } }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Can\'t get requested cart' } }
    }
  },
  [Methods.POST]: async (bodyData: any, queryParamsData: any, req: IncomingMessage, res: ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const isValid = await checkToken(req, id)
      if (!isValid) {
        return { responseStatus: 401, response: { err: 'Not authorized' } }
      }

      const cart = new ShoppingCart()
      cart.userId = id
      cart.id = randomStringGenerator(20)

      await cart.save()

      return { responseStatus: 200, response: { cart } }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Cart already exists' } }
    }
  },
  [Methods.PUT]: async (bodyData: any, queryParamsData: any, req: IncomingMessage, res: ServerResponse): Promise<RouteOutput> => {
    try {
      const { id, items } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const isValid = await checkToken(req, id)
      if (!isValid) {
        return { responseStatus: 401, response: { err: 'Not authorized' } }
      }
      const cart = new ShoppingCart()
      cart.userId = id
      await cart.load()
      if (!items) {
        return { responseStatus: 400, response: { err: 'Nothing to update' } }
      }
      /**
       * Check structure of sent items array
       */
      for (let index = 0; index < items.length; index++) {
        const item: IShoppingCartItem = items[index]
        if (typeof item !== 'object') {
          return { responseStatus: 400, response: { err: 'Invalid structure of items' } }
        }
        if (!item.id || !item.quantity) {
          return { responseStatus: 400, response: { err: 'Missing price or quantiy' } }
        }
      }
      cart.items = items
      await cart.update()
      return { responseStatus: 200 }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Can\'t find this cart' } }
    }
  },
  [Methods.DELETE]: async (bodyData: any, queryParamsData: any, req: IncomingMessage, res: ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = queryParamsData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const isValid = await checkToken(req, id)
      if (!isValid) {
        return { responseStatus: 401, response: { err: 'Not authorized' } }
      }
      const cart = new ShoppingCart()
      cart.userId = id
      await cart.delete()
      return { responseStatus: 200 }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Can\'t find this cart' } }
    }
  },
}

export default handler