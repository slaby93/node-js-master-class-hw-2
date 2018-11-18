import * as http from 'http'
import * as url from 'url'
import router from './router'
import Method from './consts/methods'
import * as querystring from 'querystring'
import { StringDecoder } from 'string_decoder'
/**
 * Server class
 * Create and maintain server instance
 */
class Server {
  serverInstance: http.Server

  constructor() {
    this.serverInstance = http.createServer(this.requestHandler)
  }

  /**
   * Function that handles incomming requests
   */
  requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {

    try {
      // get data from body
      const parsedBody: any = await this.parseBodyToJSON(req)
      // take path data from request
      const { pathname, query } = url.parse(req.url)
      const method: Method = req.method as Method
      const parsedQuery = querystring.parse(query)
      // handle request
      const { responseStatus, response } = await router(pathname, query, parsedBody, parsedQuery, method, req, res)
      // assign responseStatus
      res.statusCode = responseStatus
      // send response along with parsed data
      res.end(this.stringify(response))
    } catch {
      res.statusCode = 500
      res.end()
    }
  }

  parseBodyToJSON = async (req: http.IncomingMessage) => new Promise<string>((resolve) => {
    let body: string = ''
    const decoder = new StringDecoder('utf8')
    req.on('data', (chunk: Buffer) => body += decoder.write(chunk))
    req.on('end', () => {
      body += decoder.end()
      resolve(this.parse(body))
    })
  })

  convertMethod = (method: string): Method => {
    switch (method.toLowerCase()) {
      case 'get': return Method.GET; break;
      case 'post': return Method.POST; break;
      case 'put': return Method.PUT; break;
      case 'delete': return Method.DELETE; break;
      default: return Method.GET
    }
  }
  /**
   * Parse value from JSON
   */
  parse = (input: any) => {
    try {
      return JSON.parse(input)
    } catch {
      return input
    }
  }

  /**
   * Parse value to JSON
   */
  stringify = (value: any) => {
    try {
      return JSON.stringify(value)
    } catch {
      return value
    }
  }

  /**
   * Starts server at given port
   * @param {number} port Port to which server will bind 
   */
  start = (port = 3000) => {
    if (!this.serverInstance) {
      throw new Error('Missing server instance!')
    }

    this.serverInstance.listen(port, () => {
      // @TODO: move to Logger
      console.log(`Server started at port ${port}`)
    })
  }

}

export default Server