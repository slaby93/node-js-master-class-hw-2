import * as http from 'http'
import { Endpoint, RouteOutput } from '../interfaces'
import Methods from '../consts/methods'
import db from '../utils/db'

const MENU_FOLDER = '/'
const MENU_FILE = 'menu.json'

const handler: Endpoint = {
  [Methods.GET]: async (bodyData: any, queryParamsData: any, req: http.IncomingMessage, res: http.ServerResponse): Promise<RouteOutput> => {
    try {
      // Possible optimization: cache this so that we 
      // don't have to access file each time someone 
      // request,but it's out of scope of this exercise :)
      const menuItems = await db.load(MENU_FOLDER, MENU_FILE)
      const parsedMenuItems = JSON.parse(menuItems)

      return { responseStatus: 200, response: { menu: parsedMenuItems } }
    } catch (error) {
      return { responseStatus: 500, response: { err: 'Error while loading menu items' } }
    }
  }
}

export default handler