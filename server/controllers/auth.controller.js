const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async(req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if(candidate) {
    /**
     * Function compare 2 passwords
     * @param {string} - password that user input
     * @param {string} - password from database
     * @returns {boolean}
     */
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

    if(isPasswordCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {
        expiresIn: 60 * 60
      })
      res.json({token})
    } else {
      res.status(401).json({message: 'Пароль не верен'})

    }

  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
}

module.exports.createUser = (req, res) => {

}
