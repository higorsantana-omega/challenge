import { type Express } from 'express'

import { createApp } from '../src/app'
import { type Interactors, createInteractors } from '../src/interactors'
import { type Repositories, createRepositories } from '../src/repositories'

export default class Application {
  public repositories: Repositories
  public interactors: Interactors
  public app: Express

  async setup(): Promise<void> {
    this.repositories = createRepositories()
    this.interactors = createInteractors(this.repositories)
    this.app = createApp(this.interactors)
  }
}
