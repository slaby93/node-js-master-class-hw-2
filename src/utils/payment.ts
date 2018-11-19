import * as https from 'https'
import { StringDecoder } from 'string_decoder';
import * as querystring from 'querystring'
//@TODO: move to config
const STRIPE_URL = 'api.stripe.com'
const API_KEY = 'pk_test_tQS1VPmkGq6PRwnOpaRoXalc'
const SECRET_KEY = 'sk_test_iksJybyTtHcJJ6wtmgBkRwzE'
export default {
  pay: (orderId: string, token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const payload = querystring.stringify({
          amount: 100,
          currency: 'usd',
          description: 'test payment',
          source: token
        })
        const req = https.request({
          host: STRIPE_URL,
          path: '/v1/charges',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(payload, 'utf8'),
            'Authorization': `Bearer ${SECRET_KEY}`
          }

        }, (res) => {
          let buffer = ''
          const decoder = new StringDecoder('utf8')
          res.on('data', function (data) {
            buffer += decoder.write(data)
          });
          res.on('end', () => {
            buffer += decoder.end()
            const response = JSON.parse(buffer)
            const { statusCode } = res
            const success: boolean = response.captured && (statusCode === 200) && !response.error ? true : false
            //@TODO: move it to the logger
            console.log({ success, response })
            resolve(success)
          })
        })
        req.write(payload);

        req.end()

      } catch (error) {
        //@TODO: move to logger
        console.log({ error })
        reject()
      }
    })
  }
}
