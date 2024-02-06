import { type Request } from 'express'
import { type z, type ZodError } from 'zod'

import IncompleteRequest from '@/errors/IncompleteRequest'

class ValidateRequest {
  execute(
    data: Request,
    // eslint-disable-next-line @typescript-eslint/ban-types
    expectedRequest: z.ZodObject<{}, 'strip', z.ZodTypeAny, {}, {}>
  ): void {
    try {
      expectedRequest.parse({ ...data?.body, ...data?.query })
    } catch (error) {
      const zodError = error as ZodError
      throw new IncompleteRequest(zodError.issues)
    }
  }
}

export default new ValidateRequest()
