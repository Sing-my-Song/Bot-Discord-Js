const { DOG_FACTS } = require('./../utils/constants.js')
const { getDogFacts } = require('./../utils/fetch_api')

module.exports = {
  name: DOG_FACTS,
  aliases: ['DF', "DOGFACT", "FACTDOG"],
  des: "Get some facts of dog!",
  async execute(client, msg, args, cmd, Discord) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff').setTitle('🐕 Dog Fact')
    let res = null;
    if (!args.length || isNaN(+args[0]) || +args[0] <= 0) {
      res = await getDogFacts()
    } else if (+args[0] < 10 && +args[0] > 0) {
      res = await getDogFacts(args[0])
    } else {
      msg.channel.send("Please enter right command: -df <number>(0<number<10) 🤣")
    }
    if (res && res.facts) {
      res.facts.forEach((el) => {
        msgEmbed.setDescription(`*${el}*`)
        msg.channel.send(msgEmbed)
      })
    } else {
      msg.channel.send("No more facts 🤣")
    }
  }
}