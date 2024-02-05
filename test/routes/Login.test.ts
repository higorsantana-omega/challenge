import { faker } from '@faker-js/faker'
import request from 'supertest'

import Application from '../application'

describe('Login route', () => {
  const application = new Application()

  beforeAll(async () => {
    await application.setup()
  })

  test('should return succes on login', async () => {
    const body = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'fake'
    }
    await request(application.app).post('/api/v1/signup').send(body).expect(200)

    const response = await request(application.app)
      .post('/api/v1/login')
      .send({ email: body.email, password: body.password })
      .expect(200)

    expect(JSON.parse(response.text)).toEqual({
      user: {
        id: expect.any(String),
        name: body.name,
        email: body.email
      },
      accessToken: expect.any(String)
    })
  })
})
