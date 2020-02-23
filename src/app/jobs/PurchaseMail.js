const Mail = require('../services/Mail')

class PurchaseMail {
  get key() {
    return `PurchaseMail`
  }

  async handle(job, done) {
    const { purchaseAd, user, content } = job.data;

    await Mail.senddMail({
      from: '"Maykon Morais" <maykons501@gmail.com"',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, purchaseAuthorName: purchaseAd.author.name, purchaseTitle: purchaseAd.title, content, purchaseAd }
    })

    return done()
  }
}

module.exports = new PurchaseMail()