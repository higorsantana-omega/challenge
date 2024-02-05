export abstract class BaseInteractor<T> {
  constructor(protected repository: T) {}
}
