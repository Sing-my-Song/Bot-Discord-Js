const { HELP } = require('./../utils/constants.js')

module.exports = {
  name: HELP,
  des: "Help command!",
  execute(_, msg) {
    msg.reply(`Help command:
    -play <keyword> : play music
    -stop : stop music
    -clear <number>: delete chat 
    `)
  }
}