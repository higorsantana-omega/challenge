import { z } from 'zod'

import { AccessController } from './AccessController'
import { type Request } from '../BaseController'

export class SignupController extends AccessController {
  protected expectedRequest = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
  })

  protected async setupAccount(request: Request): Promise<void> {
    this.user = await this.interactors.user.signup({
      email: request.body.email,
      name: request.body.name,
      password: request.body.password
    })
  }
}
