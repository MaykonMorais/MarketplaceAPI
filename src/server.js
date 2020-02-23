const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')
const validate = require('express-validation')
const Sentry = require('@sentry/node')
const Youch = require('youch')


class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != 'production'

    this.middlewares()
    this.databaseConfig()
    this.sentry()
    this.routes()
    this.exception()
  }

  sentry() {
    Sentry.init(sentryConfig)
  }
  databaseConfig() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(require('./routes'))
    this.express.use(Sentry.Handlers.requestHandler())
  }
  exception() {
    if (process.env.NODE_ENV == 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV != 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 500).json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express;