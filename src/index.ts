import { createApp } from './app'
import { createInteractors } from './interactors'
import { createRepositories } from './repositories'

async function main(): Promise<void> {
  const port = process.env.PORT ?? 4568

  const repositories = createRepositories()
  const interactors = createInteractors(repositories)
  const app = createApp(interactors)

  app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
  })
}

main().catch((error) => {
  // Graceful shutdown
  console.error(error)
})
