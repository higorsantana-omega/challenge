export default class IncompleteRequest extends Error {
  constructor(errors: unknown) {
    super()
    this.message = errors as string
    this.name = 'IncompleteRequest'
  }
}
