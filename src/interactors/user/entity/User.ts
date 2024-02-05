export interface UserData {
  id: string
  name: string
  email: string
  password: string
}

export class User {
  private readonly id: string
  private readonly name: string
  private readonly email: string
  private readonly password: string

  constructor({ id, name, email, password }: UserData) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPassword(): string {
    return this.password
  }
}