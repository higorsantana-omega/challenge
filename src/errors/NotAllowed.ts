export default class NotAllowed extends Error {
  constructor(errors: unknown) {
    super()
    this.name = 'NotAllowed'
    this.message = errors as string
  }
}
