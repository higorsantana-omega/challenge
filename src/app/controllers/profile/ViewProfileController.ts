import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

export class ViewProfileController extends BaseController {
  protected expectedRequest = z.object({})

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const profile = await this.interactors.profile.view(
      this.getUserId(request),
      request.params.profileId
    )

    const address = await this.interactors.address.viewByProfileId(profile.id!)

    return response.status(200).send({ profile, address })
  }
}
