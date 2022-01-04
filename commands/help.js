const {HELP} = require('./../utils/constants.js')

module.exports = {
  name: HELP,
  des: "Help command!",
  execute(msg, _args) {
    msg.reply(`Help command:
    -play <keyword> : play music
    -stop : stop music
    -clear <number>: delete chat 
    `)
  }
}