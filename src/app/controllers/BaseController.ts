import { type Request, type Response } from 'express'

import { type Interactors } from '../../interactors'
import HandleError from '../middlewares/HandleError'

export abstract class BaseController {
  constructor(protected interactors: Interactors) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      return await this.execute(request, response)
    } catch (error) {
      return HandleError.execute(error as Error, response)
    }
  }

  protected abstract execute(
    request: Request,
    response: Response
  ): Promise<Response>
}

export type { Request, Response }
