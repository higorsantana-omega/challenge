export interface Repository {
  findById: <T>(id: string) => Promise<T>
  save: <T>(entity: T) => Promise<T>
}
