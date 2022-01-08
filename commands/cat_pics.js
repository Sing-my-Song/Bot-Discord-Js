const { CAT_PICS } = require('./../utils/constants')
const { getCatPics } = require('./../utils/fetch_api')

module.exports = {
  name: CAT_PICS,
  aliases: ['CAT', 'CATPIC', 'PICCAT'],
  des: "Cat as a service (cats pictures and gifs)",
  async execute(client, msg, args, cmd, Discord) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff').setTitle('🐱‍🚀 Cat Photo 📷')
    const res = await getCatPics()
    await msgEmbed.setImage(res.url)
    return await msg.channel.send(msgEmbed)
  }
}