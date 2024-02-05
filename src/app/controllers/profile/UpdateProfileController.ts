import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

export class UpdateProfileController extends BaseController {
  protected expectedRequest = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    cellphone: z.string().optional(),
    phone: z.string().optional(),
    cnpj: z.string().optional(),
    cpf: z.string().optional(),
    type: z.union([z.literal('JURIDICAL'), z.literal('INDIVIDUAL')]).optional()
  })

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const profile = await this.interactors.profile.update(
      this.getUserId(request),
      request.params.profileId,
      {
        cellphone: request.body.cellphone,
        cnpj: request.body.cnpj,
        cpf: request.body.cpf,
        email: request.body.email,
        name: request.body.name,
        phone: request.body.phone,
        type: request.body.type
      }
    )

    return response.status(200).send({ profile })
  }
}
