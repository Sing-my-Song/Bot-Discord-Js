const { CLEAR } = require('./../utils/constants.js')

module.exports = {
  name: CLEAR,
  des: "Clear message!",
  execute(_, msg, args) {
    if (!args[0]) return msg.channel.send('Error!')
    msg.channel.bulkDelete(args[0]).catch(console.error());
  }
}