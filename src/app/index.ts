/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response, Router } from 'express'
import { type Interactors } from 'src/interactors'

import routes from './controllers'
import type Route from './controllers/Route'

export function createApp(interactors: Interactors) {
  const app = express()

  app.use(express.json())

  app.use('/api/v1', createControllers(routes, interactors))
  app.get('/ping', (req, res) => res.send('pong'))

  return app
}

function createControllers(routes: Route[], interactors: Interactors): Router {
  const router = Router()

  routes.forEach((route) => {
    const callback = async (request: Request, response: Response) => {
      const controller = new route.Controller(interactors)
      return await controller.handle(request, response)
    }

    switch (route.method) {
      case 'GET':
        router.get(route.url, callback)
        break

      case 'POST':
        router.post(route.url, callback)
        break

      case 'PUT':
        router.put(route.url, callback)
        break

      case 'PATCH':
        router.patch(route.url, callback)
        break

      case 'DELETE':
        router.delete(route.url, callback)
        break

      default:
        throw new Error('Unknown HTTP method')
    }
  })

  return router
}
