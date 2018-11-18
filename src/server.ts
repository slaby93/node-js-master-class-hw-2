import * as http from 'http'
import * as url from 'url'
import * as router from './router'

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
  requestHandler = (req: http.IncomingMessage, res : http.ServerResponse) => {
    console.log({ req, res })
    res.end()
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