const User = require('../models/User')

class UserController {
  async store(req, res) {
    // get email of request
    const { email } = req.body;

    // verify if email already exist
    if (await User.findOne({ email })) {
      return res.status(400).json({
        error: 'User already exists'
      })
    }

    // create new user
    const user = await User.create(req.body);
    return res.json(user)
  }
}

module.exports = new UserController()