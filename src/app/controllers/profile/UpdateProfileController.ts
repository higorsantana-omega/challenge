import { z } from 'zod'

import { type Response, type Request, BaseController } from '../BaseController'

import { type Address } from '@/interactors/address/entity/Address'
import { type CreateAddressDTO } from '@/interactors/address/useCases/CreateAddress'
import { type UpdateAddressDTO } from '@/interactors/address/useCases/UpdateAddress'

export class UpdateProfileController extends BaseController {
  protected expectedRequest = z.object({
    profile: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      cellphone: z.string().optional(),
      phone: z.string().optional(),
      cnpj: z.string().optional(),
      cpf: z.string().optional(),
      type: z
        .union([z.literal('JURIDICAL'), z.literal('INDIVIDUAL')])
        .optional()
    }),
    address: z
      .object({
        id: z.string().optional(),
        cep: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        city: z.string().optional(),
        neighborhood: z.string().optional(),
        complement: z.string().optional(),
        state: z.string().optional()
      })
      .optional()
  })

  protected async execute(
    request: Request,
    response: Response
  ): Promise<Response> {
    const profile = await this.interactors.profile.update(
      this.getUserId(request),
      request.params.profileId,
      {
        cellphone: request.body.profile.cellphone,
        cnpj: request.body.profile.cnpj,
        cpf: request.body.profile.cpf,
        email: request.body.profile.email,
        name: request.body.profile.name,
        phone: request.body.profile.phone,
        type: request.body.profile.type
      }
    )

    let address: Address | null = null

    if (request.body.address.id) {
      address = await this.interactors.address.update(
        request.body.address.id as string,
        {
          ...(request.body.address as UpdateAddressDTO)
        }
      )
    }

    if (request.body.address && !request.body.address.id) {
      address = await this.interactors.address.create({
        ...(request.body.address as CreateAddressDTO),
        profileId: profile.id!
      })
    }

    return response.status(200).send({ profile, address })
  }
}
