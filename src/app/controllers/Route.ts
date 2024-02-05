import { type Interactors } from 'src/interactors'

import { type BaseController } from './BaseController'

export default interface Route {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  Controller: new (interactors: Interactors) => BaseController
}
