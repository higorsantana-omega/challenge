import request from 'supertest'

import app from '../../src/app'

describe('Ping route', () => {
  test('should return status code 200 on success', async () => {
    const response = await request(app).get('/ping').expect(200)

    expect(response.text).toBe('pong')
  })
})
