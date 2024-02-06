import { type CreateAddressDTO } from 'src/interactors/address/useCases/CreateAddress'
import { type CreateProfileDTO } from 'src/interactors/profile/useCases/CreateProfile'
import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

export class CreateProfileController extends BaseController {
  protected expectedRequest = z.object({
    profile: z.object({
      name: z.string(),
      email: z.string(),
      cellphone: z.string(),
      phone: z.string(),
      cnpj: z.string().optional(),
      cpf: z.string(),
      type: z.union([z.literal('JURIDICAL'), z.literal('INDIVIDUAL')])
    }),
    address: z
      .object({
        cep: z.string(),
        street: z.string(),
        number: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        complement: z.string().optional(),
        state: z.string()
      })
      .optional()
  })

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const profile = await this.interactors.profile.create({
      ...(request.body.profile as CreateProfileDTO),
      userId: this.getUserId(request)
    })

    const address = request.body.address
      ? await this.interactors.address.create({
          ...(request.body.address as CreateAddressDTO),
          profileId: profile.id!
        })
      : null

    return response.status(201).send({ profile, address })
  }
}
