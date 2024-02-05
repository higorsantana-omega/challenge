import request from 'supertest'

import Application from '../application'

describe('Ping route', () => {
  const application = new Application()

  beforeAll(async () => {
    await application.setup()
  })

  test('should return status code 200 on success', async () => {
    const response = await request(application.app).get('/ping').expect(200)

    expect(response.text).toBe('pong')
  })
})
