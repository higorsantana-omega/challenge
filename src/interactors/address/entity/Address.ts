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

  static createFrom(data: AddressData): Address {
    return new Address(data)
  }

  serialize() {
    return {
      id: this.id,
      profileId: this.profileId,
      cep: this.cep,
      city: this.city,
      complement: this.complement,
      neighborhood: this.neighborhood,
      number: this.number,
      state: this.state,
      street: this.street
    }
  }
}
