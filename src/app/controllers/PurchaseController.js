const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store(req, res) {
    // ad = id; compra content = msg
    const { ad, content } = req.body;

    // encontrar anuncio
    const purchaseAd = await Ad.findById(ad).populate('author')

    // encontrar usuario
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Maykon Morais" <maykons501@gmail.com"',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, purchaseAuthorName: purchaseAd.author.name, purchaseTitle: purchaseAd.title, content, purchaseAd }
    })

    return res.send()
  }
}

module.exports = new PurchaseController()