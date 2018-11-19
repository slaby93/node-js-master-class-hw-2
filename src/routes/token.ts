import * as http from 'http'
import { RouteOutput, Endpoint } from '../interfaces';
import Methods from '../consts/methods';
import randomStringGenerator from '../utils/randomStringGenerator';
import db from '../utils/db';

export const TOKEN_FOLDER = 'tokens'
const ONE_HOUR = 1000 * 60 * 60

const handler: Endpoint = {
  [Methods.GET]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = queryParamsData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const token = await db.load(TOKEN_FOLDER, id)
      const parsedToken = JSON.parse(token)
      return { responseStatus: 200, response: { token: parsedToken } }
    } catch (error) {
      return { responseStatus: 500 }
    }
  },
  [Methods.POST]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }

      const token = {
        token: randomStringGenerator(20),
        expirationDate: Date.now() + ONE_HOUR
      }
      await db.save(TOKEN_FOLDER, id, JSON.stringify(token))
      return { responseStatus: 200, response: { token } }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Can\'t create new token.' } }
    }
  },
  [Methods.PUT]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      const token: string = await db.load(TOKEN_FOLDER, id)
      const parsedToken = JSON.parse(token)
      parsedToken.expirationDate += ONE_HOUR
      await db.update(TOKEN_FOLDER, id, JSON.stringify(parsedToken))
      return { responseStatus: 200 }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Error while updating expiration date' } }
    }
  },
  [Methods.DELETE]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    try {
      const { id } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Invalid id field' } }
      }
      await db.delete(TOKEN_FOLDER, id)
      return { responseStatus: 200 }
    } catch (error) {
      return { responseStatus: 500 }
    }
  },
}

export default handler