import * as http from 'http'
import { RouteHandler, RouteOutput } from './../interfaces'
import Method from './../consts/methods'

const handler: { [index: string]: RouteHandler } = {
    [Method.GET]: (path: string, query: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        res.setHeader('Content-Type', 'application/json')
        resolve({ responseStatus: 400, response: 'NOT IMPLEMENTED!' })
    }),
    [Method.POST]: (path: string, query: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        setTimeout(() => { 
            res.setHeader('Content-Type', 'application/json')
            resolve({ responseStatus: 400, response: 'test' })
        }, 1000)
    }),
    [Method.PUT]: (path: string, query: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        setTimeout(() => {
            res.setHeader('Content-Type', 'application/json')
            resolve({ responseStatus: 400, response: 'test' })
        }, 1000)
    }),
    [Method.DELETE]: (path: string, query: string, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => new Promise((resolve) => {
        setTimeout(() => {
            res.setHeader('Content-Type', 'application/json')
            resolve({ responseStatus: 400, response: 'test' })
        }, 1000)
    }),
}

export default handler