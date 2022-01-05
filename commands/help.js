const { HELP } = require('./../utils/constants.js')

module.exports = {
  name: HELP,
  aliases: ['H', "HELP"],
  des: "Help command!",
  execute(_, msg) {
    msg.reply(`***Help command***:
    -play <keyword> : play music
    -skip : skip song
    -stop : stop music
    `)
  }
}