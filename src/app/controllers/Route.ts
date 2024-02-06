import { type BaseController } from './BaseController'

import { type Interactors } from '@/interactors'

export default interface Route {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  Controller: new (interactors: Interactors) => BaseController
}
