export default class NotAuthorized extends Error {
  constructor(errors: unknown) {
    super()
    this.name = 'NotAuthorized'
    this.message = errors as string
  }
}
