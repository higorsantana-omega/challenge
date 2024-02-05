import { type Response } from 'express'
import NotAuthorized from 'src/errors/NotAuthorized'

class HandleError {
  execute(err: Error, response: Response): Response {
    if (err instanceof NotAuthorized) response.status(401)
    else {
      response.status(500)
    }

    return response.send({ errors: err.message || 'An error occurred.' })
  }
}

export default new HandleError()
