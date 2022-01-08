const { ANIME_QUOTES } = require('./../utils/constants.js')
const { getAnimeQuotes } = require('./../utils/fetch_api')

module.exports = {
  name: ANIME_QUOTES,
  aliases: ['AQ', "AQUOTES", "ANIMEQUOTES","ANIMEQ"],
  des: "Get some anime quotes!",
  async execute(client, msg, args, cmd, Discord) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
    if (!args.length) {
      const res = await getAnimeQuotes()
      await msgEmbed.setAuthor(`🎥 ${res.anime} 🎥`).setTitle(`🐱‍🚀 *${res.character}*`).setDescription(`📝 ${res.quote}`)
    } else {
      const prefix = args.shift()
      switch (prefix.toLowerCase()) {
        case "a":
          const res_ani = await getAnimeQuotes(args.join(" "))
          await msgEmbed.setAuthor(`🎥 ${res_ani.anime} 🎥`).setTitle(`🐱‍🚀 *${res_ani.character}*`).setDescription(`📝 ${res_ani.quote}`)
          break
        case "c":
          const res_char = await getAnimeQuotes("", args.join(" "))
          await msgEmbed.setAuthor(`🎥 ${res_char.anime} 🎥`).setTitle(`🐱‍🚀 *${res_char.character}*`).setDescription(`📝 ${res_char.quote}`)
          break
        default:
          break
      }
    }
    return msg.channel.send(msgEmbed)
  }
}