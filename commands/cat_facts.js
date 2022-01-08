const { CAT_FACTS } = require('./../utils/constants.js')
const { getCatFacts } = require('./../utils/fetch_api')

module.exports = {
  name: CAT_FACTS,
  aliases: ['CF', "CATFACT", "FACTCAT"],
  des: "Get some facts of cat!",
  async execute(client, msg, args, cmd, Discord) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff').setTitle('🐱‍🚀 Cat Fact')
    let res = null;
    if (!args.length || isNaN(+args[0]) || +args[0] <= 0) {
      res = await getCatFacts()
      if (res) {
        msgEmbed.setDescription(`*${res.text}*`)
        msg.channel.send(msgEmbed)
      }
    } else if (+args[0] < 10 && +args[0] > 0) {
      res = await getCatFacts(args[0])
      if (res) {
        res.forEach((el) => {
          msgEmbed.setDescription(`*${el.text}*`)
          msg.channel.send(msgEmbed)
        })
      }
    } else {
      msg.channel.send("Please enter right command: -cf <number>(0<number<10) 🤣nya!🤣")
    }

  }
}