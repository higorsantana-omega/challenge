import { type User } from '../../../interactors/user/entity/User'
import Authentication from '../../middlewares/Authentication'
import { BaseController, type Request, type Response } from '../BaseController'

export abstract class AccessController extends BaseController {
  private readonly authentication = new Authentication()

  async execute(request: Request, response: Response): Promise<Response> {
    await this.setupAccount(request, response)

    const accessToken = this.authentication.createAccessToken(this.user.getId())

    return response.status(200).send({
      ...this.additionalResponse,
      user: this.user,
      accessToken
    })
  }

  protected additionalResponse = {}
  protected user!: User

  protected abstract setupAccount(
    request: Request,
    response: Response
  ): Promise<Response | void>
}
