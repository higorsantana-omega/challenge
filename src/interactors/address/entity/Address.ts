export interface AddressData {
  id: string
  profileId: string
  cep: string
  street: string
  number: string
  complement?: string
  city: string
  neighborhood: string
  state: string
}

export class Address {
  private readonly id?: string
  private readonly profileId: string
  private readonly cep: string
  private readonly city: string
  private readonly complement?: string
  private readonly neighborhood: string
  private readonly number: string
  private readonly state: string
  private readonly street: string

  constructor({
    id,
    profileId,
    cep,
    city,
    complement,
    neighborhood,
    number,
    state,
    street
  }: AddressData) {
    this.id = id
    this.profileId = profileId
    this.cep = cep
    this.city = city
    this.complement = complement
    this.neighborhood = neighborhood
    this.number = number
    this.state = state
    this.street = street
  }

  toJSON(): any {
    return { ...this }
  }
}
