const Ad = require('../models/Ad')
const User = require('../models/User')
const purchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')


class PurchaseController {
  async store(req, res) {
    // ad = id; compra content = msg
    const { ad, content } = req.body;

    // encontrar anuncio
    const purchaseAd = await Ad.findById(ad).populate('author')
    // encontrar usuario
    const user = await User.findById(req.userId)

    Queue.create(purchaseMail.key, {
      purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()