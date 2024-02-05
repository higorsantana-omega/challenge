/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import jwt from 'jsonwebtoken'

import NotAuthorized from '../../errors/NotAuthorized'

export default class Authentication {
  decodeAccessToken(accessToken: string | undefined): string {
    if (!accessToken) {
      throw new NotAuthorized('No token provided')
    }

    try {
      const userId = jwt.verify(accessToken, process.env.JWT_SECRET as string)
      return userId as string
    } catch {
      throw new NotAuthorized('Invalid token')
    }
  }

  createAccessToken(userID: string): string {
    const accessToken = jwt.sign(userID, process.env.JWT_SECRET as string)
    return accessToken
  }
}
