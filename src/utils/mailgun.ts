//@TODO move to config
const API_KEY = '1053eade-6a6332eb'
import * as https from 'https'
import * as querystring from 'querystring'
import { IncomingMessage } from 'http';
import { StringDecoder } from 'string_decoder';
import User from '../models/user';

const MAILGUN_URL = 'api.mailgun.net'
const MAILGUN_AUTH = 'api:069433730221b3b149f276cceef93562-1053eade-6a6332eb'

export default {
  sendEmail: (user: User): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        const payload = querystring.stringify({
          from: 'Mailgun Sandbox <postmaster@sandboxd0e6fac8a63b4f97a34bfc1df0137843.mailgun.org>',
          to: `${user.name} <${user.email}>`,
          subject: 'Your order is accepted!',
          text: `Congratulations ${user.name}, you just helped Nigerian prince! Thanks!`,
        })
        const request = https.request({
          host: MAILGUN_URL,
          path: '/v3/sandboxd0e6fac8a63b4f97a34bfc1df0137843.mailgun.org/messages',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(payload, 'utf8'),
          },
          auth: MAILGUN_AUTH
        }, (response: IncomingMessage) => {
          let buffer = ''
          const decoder = new StringDecoder('utf8')
          response.on('data', function (data) {
            buffer += decoder.write(data)
          });
          response.on('end', () => {
            buffer += decoder.end()
            const response = JSON.parse(buffer)
            //@TODO: move it to the logger
            console.log('Mailgun', { response })
            resolve()
          })
        })
        request.write(payload)
        request.end()
      } catch (error) {
        //@TODO: move to logger
        console.log({ error })
        reject()
      }
    })
  }
}