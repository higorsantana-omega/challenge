export interface Repository<T, QueryableFields> {
  save: (entity: T) => Promise<T>
  findOnyBy: (fields: Partial<QueryableFields>) => Promise<T | undefined>
}
