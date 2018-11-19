import * as http from 'http'
import { RouteOutput } from './interfaces'
import Method from './consts/methods'
import routes from './routes'


const router = async (path: string, query: string, parsedBody: any, parsedQuery: any, method: Method, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    const handler = routes[path][method]
    if (!handler) {
        return { responseStatus: 404, response: { msg: 'Can\'t find requested route!' } }
    }
    const output: RouteOutput = await handler(parsedBody, parsedQuery, req, res)
    return output
}

export default router