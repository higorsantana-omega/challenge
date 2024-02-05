import { AccessController } from './AccessController'
import { type Request } from '../BaseController'

export class LoginController extends AccessController {
  protected async setupAccount(request: Request): Promise<void> {
    this.user = await this.interactors.user.login({
      email: request.body.email,
      password: request.body.password
    })
  }
}
