import IncompleteRequest from '../../../errors/IncompleteRequest'

export type ProfileType = 'INDIVIDUAL' | 'JURIDICAL'

export interface ProfileData {
  id: string
  userId: string
  name: string
  email: string
  cellphone: string
  phone: string
  cnpj?: string
  cpf: string
  type: ProfileType
}

export class Profile {
  readonly id?: string
  readonly userId: string
  private readonly name: string
  readonly email: string
  private readonly cellphone: string
  private readonly phone: string
  private readonly cnpj?: string
  private readonly cpf: string
  readonly type: ProfileType

  constructor({
    id,
    userId,
    name,
    email,
    cellphone,
    phone,
    cnpj,
    cpf,
    type
  }: ProfileData) {
    this.id = id
    this.userId = userId
    this.name = name
    this.email = email
    this.cellphone = cellphone
    this.phone = phone
    this.cnpj = cnpj
    this.cpf = cpf
    this.type = type

    this.validateType()
  }

  isJuridical(): boolean {
    return this.type === 'JURIDICAL'
  }

  isIndividual(): boolean {
    return this.type === 'INDIVIDUAL'
  }

  validateType(): void {
    if (this.type === 'JURIDICAL' && !this.cnpj) {
      throw new IncompleteRequest('CNPJ is required for JURIDICAL type')
    }

    if (this.type === 'INDIVIDUAL' && this.cnpj) {
      throw new IncompleteRequest(
        'CNPJ should not be provided for INDIVIDUAL type'
      )
    }
  }

  toJSON(): any {
    return { ...this }
  }
}
