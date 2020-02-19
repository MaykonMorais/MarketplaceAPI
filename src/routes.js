const express = require('express')

const routes = express.Router();

const UserController = require('./app/controllers/UserController')
const controllers = require('./app/controllers')

routes.post('/users', controllers.UserController.store)
routes.post('/sessions', constrollers.SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => {
  res.json({ ok: true })
})

module.exports = routes;