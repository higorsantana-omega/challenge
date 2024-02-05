import { AccessController } from './AccessController'
import { type Request } from '../BaseController'

export class SignupController extends AccessController {
  protected async setupAccount(request: Request): Promise<void> {
    this.user = await this.interactors.user.signup({
      email: request.body.email,
      name: request.body.name,
      password: request.body.password
    })
  }
}
