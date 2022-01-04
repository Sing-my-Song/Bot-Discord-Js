const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { PLAY } = require('./../utils/constants.js')

module.exports = {
  name: PLAY,
  des: 'Join and plays a video from youtube',
  async execute(msg, args, Discord) {
    const voiceChannel = msg.member.voice.channel
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')

    if (!voiceChannel)
      return msg.channel.send('You need to be in a voice channel to execute this command!')
    const permissions = voiceChannel.permissionsFor(msg.client.user)

    if (!permissions.has("CONNECT"))
      return msg.channel.send("You dont have the correct permissions!")

    if (!permissions.has("SPEAK"))
      return msg.channel.send("You dont have the correct permissions!")

    if (!args.length)
      return msg.channel.send("You need to send the second argument! **(-play ...)**")

    const validURL = (str) => {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    }

    //play with url
    if (validURL(args[0])) {
      const connection = await voiceChannel.join()
      const stream = ytdl(args[0], { filter: 'audioonly' })
      connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
        voiceChannel.leave()
      })
      await msg.reply(`:thumbsup: Now playing **Your Link!***`)
      return
    }

    //play with keyword
    const connection = await voiceChannel.join()

    const videoFinder = async (query) => {
      const videosRes = await ytSearch(query)
      return (videosRes.videos.length > 1) ? videosRes.videos[0] : null
    }

    const video = await videoFinder(args.join(' '))

    if (video) {
      const stream = ytdl(video.url, { filter: 'audioonly' })
      connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
        voiceChannel.leave()
      })
      msgEmbed.setTitle(video.title)
        .setURL(video.url)
        .setFooter(`Video length: ${video.timestamp}`)

      await msg.reply(":thumbsup: Now playing")
      msg.channel.send(msgEmbed)

    } else {
      msg.channel.send("No video results found!")
    }
  }
}