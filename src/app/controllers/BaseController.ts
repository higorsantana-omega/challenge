/* eslint-disable @typescript-eslint/ban-types */
import { type Request, type Response } from 'express'
import { type z } from 'zod'

import Authentication from '@/app/middlewares/Authentication'
import HandleError from '@/app/middlewares/HandleError'
import ValidateRequest from '@/app/middlewares/ValidateRequest'
import { type Interactors } from '@/interactors'

export abstract class BaseController {
  constructor(protected interactors: Interactors) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      ValidateRequest.execute(request, this.expectedRequest)
      return await this.execute(request, response)
    } catch (error) {
      return HandleError.execute(error as Error, response)
    }
  }

  protected getUserId(request: Request): string {
    const authentication = new Authentication()
    return authentication.decodeAccessToken(request.headers.authorization)
  }

  protected abstract expectedRequest: z.ZodObject<
    {},
    'strip',
    z.ZodTypeAny,
    {},
    {}
  >
  protected abstract execute(
    request: Request,
    response: Response
  ): Promise<Response>
}

export type { Request, Response }
