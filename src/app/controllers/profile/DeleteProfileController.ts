import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

export class DeleteProfileController extends BaseController {
  protected expectedRequest = z.object({})

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    await this.interactors.profile.delete(
      this.getUserId(request),
      request.params.profileId
    )

    return response.status(200).send()
  }
}
