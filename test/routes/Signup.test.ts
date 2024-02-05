import { faker } from '@faker-js/faker'
import request from 'supertest'

import Application from '../application'

describe('Signup route', () => {
  const application = new Application()

  beforeAll(async () => {
    await application.setup()
  })

  test('should return an account on success', async () => {
    const body = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'fake'
    }
    const response = await request(application.app)
      .post('/api/v1/signup')
      .send(body)
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

  test('should throw error if alread exists an account with same e-mail', async () => {
    const body = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'fake'
    }

    await request(application.app).post('/api/v1/signup').send(body).expect(200)

    const response = await request(application.app)
      .post('/api/v1/signup')
      .send(body)
      .expect(403)

    expect(JSON.parse(response.text)).toEqual({
      errors: 'Email already exists'
    })
  })
})
