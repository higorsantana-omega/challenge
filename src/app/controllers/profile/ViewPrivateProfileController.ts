import { type CreateProfileDTO } from 'src/interactors/profile/useCases/CreateProfile'
import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

export class ViewPrivateProfileController extends BaseController {
  protected expectedRequest = z.object({
    name: z.string(),
    email: z.string(),
    cellphone: z.string(),
    phone: z.string(),
    cnpj: z.string().optional(),
    cpf: z.string(),
    type: z.union([z.literal('JURIDICAL'), z.literal('INDIVIDUAL')])
  })

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const profile = await this.interactors.profile.create({
      ...(request.body as CreateProfileDTO),
      userId: this.getUserId(request)
    })

    return response.status(201).send({ profile })
  }
}
