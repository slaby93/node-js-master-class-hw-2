import * as http from 'http'
import UserHandler from './routes/user'
import { RouteHandler, RouteOutput } from './interfaces'
import Method from './consts/methods'

const routes: { [index: string]: { [method: string]: RouteHandler } } = {
    '/user': UserHandler
}

const router = async (path: string, query: string, method: Method, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    const handler = routes[path][method]
    if (!handler) {
        return { responseStatus: 404, response: { msg: 'Can\'t find requested route!' } }
    }
    const output: RouteOutput = await handler(path, query, req, res)
    return output
}

export default router