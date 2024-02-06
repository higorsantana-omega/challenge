import { type Response } from 'express'

import EntityNotFound from '@/errors/EntityNotFound'
import IncompleteRequest from '@/errors/IncompleteRequest'
import NotAllowed from '@/errors/NotAllowed'
import NotAuthorized from '@/errors/NotAuthorized'

class HandleError {
  execute(err: Error, response: Response): Response {
    if (err.name === NotAuthorized.name) response.status(401)
    else if (err.name === NotAllowed.name) response.status(403)
    else if (err.name === EntityNotFound.name) response.status(404)
    else if (err.name === IncompleteRequest.name) response.status(400)
    else {
      response.status(500)
    }

    return response.send({ errors: err.message || 'An error occurred.' })
  }
}

export default new HandleError()
