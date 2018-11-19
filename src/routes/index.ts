import UserHandler from './user'
import TokenHandler from './token'
import MenuHandler from './menu'
import { RouteHandler } from './../interfaces'

const routes: { [index: string]: { [method: string]: RouteHandler } } = {
  '/user': UserHandler,
  '/token': TokenHandler,
  '/menu': MenuHandler
}

export default routes