import dotenv from 'dotenv'

import { createApp } from './app'
import { createInteractors } from './interactors'
import { createRepositories } from './repositories'

dotenv.config({
  path: !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`
})

async function main(): Promise<void> {
  const port = process.env.PORT ?? 4568

  const repositories = createRepositories()
  const interactors = createInteractors(repositories)
  const app = createApp(interactors)

  app.listen(port, () => {
    console.log(process.env.NODE_ENV)
    console.log(`Escutando na porta ${port}`)
  })
}

main().catch((error) => {
  // Graceful shutdown
  console.error(error)
})
