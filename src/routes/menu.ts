import * as http from 'http'
import { Endpoint, RouteOutput } from '../interfaces';
import Methods from '../consts/methods';
import randomStringGenerator from '../utils/randomStringGenerator';
import db from '../utils/db';

const handler: Endpoint = {
  [Methods.GET]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    return { responseStatus: 200 }
  }
}

export default handler