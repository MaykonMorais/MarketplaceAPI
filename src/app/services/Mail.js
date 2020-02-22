const nodeMailer = require('nodemailer')
const mailConfig = require('../../config/mail')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express3-handlebars')

const transport = nodeMailer.createTransport(mailConfig)

// setando caminho para views
const viewPath = path.join(__dirname, '..', 'views', 'emails')

transport.use('compile', hbs({
  viewEngine: exphbs.create({
    partialsDir: path.join(viewPath.toString(), 'partials')
  }),
  viewPath: viewPath.toString(),
  extName: '.hbs'
}))

module.exports = transport;