import express from 'express'

const app = express()

app.get('/ping', (req, res) => {
  return res.send('pong')
})

export default app
