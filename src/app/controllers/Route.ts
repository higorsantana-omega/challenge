import { type Interactors } from 'src/interactors'

import { type BaseController } from './BaseController'

export default interface Route {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  Controller: new (interactors: Interactors) => BaseController
}
