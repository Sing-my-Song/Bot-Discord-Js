const {HI} = require('./../utils/constants.js')

module.exports = {
  name: HI,
  des: "Ping command!",
  execute(msg, _args) {
    msg.reply('Hi There!')
  }
}