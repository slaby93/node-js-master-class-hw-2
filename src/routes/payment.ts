import * as http from 'http'
import { Endpoint, RouteOutput } from '../interfaces'
import Methods from '../consts/methods'
import { checkToken } from '../utils/routes'
import Order from '../models/Order'
import payment from '../utils/payment'
import mailgun from '../utils/mailgun'
import User from '../models/User';

const handler: Endpoint = {
  [Methods.POST]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const { id, orderId, token } = bodyData
      if (!id) {
        return { responseStatus: 400, response: { err: 'Id is not provided' } }
      }
      if (!orderId) {
        return { responseStatus: 400, response: { err: 'orderId is not provided' } }
      }
      const isValid = await checkToken(req, id)
      if (!isValid) {
        return { responseStatus: 401, response: { err: 'Not authorized' } }
      }
      const user = new User()
      user.id = id
      await user.load()
      await mailgun.sendEmail(user)
      const success = await payment.pay(orderId, token)
      const order = new Order()
      order.userId = id
      await order.load()
      order.receivedPayment = success
      await order.update()
      return { responseStatus: 200, response: { success } }

    } catch (error) {
      //@TODO: move to logger
      console.log({ error })
      return { responseStatus: 500, response: { err: 'Error while creating order' } }
    }
  }
}

export default handler