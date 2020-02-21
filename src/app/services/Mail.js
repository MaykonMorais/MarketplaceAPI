const nodeMailer = require('nodemailer')
const mailConfig = require('../../config/mail')

const transport = nodeMailer.createTransport(mailConfig)

module.exports = transport;