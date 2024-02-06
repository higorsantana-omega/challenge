import { type Express } from 'express'

import { createApp } from '@/app'
import { type Interactors, createInteractors } from '@/interactors'
import { type Repositories, createRepositories } from '@/repositories'

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
