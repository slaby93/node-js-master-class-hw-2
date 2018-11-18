import * as http from 'http'
import * as url from 'url'
import router from './router'
import Method from './consts/methods'

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
      // take path data from request
      const { pathname, query } = url.parse(req.url)
      const method: Method = req.method as Method
      // handle request
      const { responseStatus, response } = await router(pathname, query, method, req, res)
      // assign responseStatus
      res.statusCode = responseStatus
      // send response along with parsed data
      res.end(this.parseResponse(response))
    } catch {
      res.statusCode = 500
      res.end()
    }
  }

  convertMethod = (method: string): Method => {
    switch (method.toLowerCase()) {
      case 'get': return Method.GET; break;
      case 'post': return Method.POST; break;
      case 'put': return Method.PUT; break;
      case 'delete': return Method.DELETE; break;
      default: return Method.GET
    }
  }

  parseResponse = (response: any) => {
    try {
      return JSON.stringify(response)
    } catch {
      return response
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