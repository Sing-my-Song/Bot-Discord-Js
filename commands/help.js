const { HELP } = require('./../utils/constants.js')

module.exports = {
  name: HELP,
  aliases: ['H', "HELP"],
  des: "Help command!",
  execute(_, msg) {
    msg.reply(`🎱 ***Help command*** 🎱:
    -animeq : *anime random quotes* 🐱‍👓
    -play <keyword> : *play music* 🎶
    -skip : *skip song* ⏭
    -stop : *stop music* ⏹
    -df <number> : *some facts about dog* 🐕‍🦺
    -cf <number> : *some facts about cat* ‍🐈
    -cat : *random cat pictures* ‍🐈
    -cr <ht | th>: *encryption and decryption* 🎴
    `)
  }
}