const { CLEAR } = require('./../utils/constants.js')
const { ADMINISTRATOR, MANAGE_MESSAGES } = require('./../utils/permissions.js')

module.exports = {
  name: CLEAR,
  aliases: ['CL', "CLEAR"],
  permissions: [ADMINISTRATOR, MANAGE_MESSAGES],
  des: "Clear message!",
  execute(_, msg, args) {
    if (!args[0]) return msg.channel.send('Error!')
    msg.channel.bulkDelete(args[0]).catch(console.error());
  }
}