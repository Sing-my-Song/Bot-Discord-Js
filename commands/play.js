const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { PLAY } = require('./../utils/constants.js')
const { CONNECT, SPEAK } = require('./../utils/permissions.js')

const queue = new Map()

module.exports = {
  name: PLAY,
  aliases: ['P', 'SKIP', 'STOP', 'LIST', 'LS'],
  cooldown: 3,
  des: 'Music from youtube!',
  async execute(_, msg, args, cmd, Discord) {
    const voiceChannel = msg.member.voice.channel
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')

    if (!voiceChannel)
      return msg.channel.send('You need to be in a voice channel to execute this command!')
    const permissions = voiceChannel.permissionsFor(msg.client.user)
    if (!permissions.has(CONNECT))
      return msg.channel.send("You dont have the correct permissions!")
    if (!permissions.has(SPEAK))
      return msg.channel.send("You dont have the correct permissions!")

    const server_queue = queue.get(msg.guild.id)

    switch (cmd) {
      case PLAY: case 'P':
        if (!args.length)
          return msg.channel.send("You need to send the second argument! **(-play ...)**")
        let song = {};

        if (ytdl.validateURL(args[0])) {
          const song_info = await ytdl.getInfo(args[0])
          console.log(song_info)
          song = {
            title: song_info.videoDetails.title,
            url: song_info.videoDetails.video_url,
            timestamp: song_info.videoDetails.timestamp
          }
        } else {
          const videos_finder = async query => {
            const videosRes = await ytSearch(query)
            return (videosRes.videos.length > 1) ? videosRes.videos[0] : null
          }
          const video = await videos_finder(args.join(' '))
          if (video) {
            song = { title: video.title, url: video.url, timestamp: video.timestamp }
          } else {
            msg.channel.send("No video results found!")
          }
        }

        if (!server_queue) {
          const queue_constructor = {
            voide_channel: voiceChannel,
            text_channel: msg.channel,
            connection: null,
            songs: []
          }
          queue.set(msg.guild.id, queue_constructor)
          queue_constructor.songs.push(song)

          try {
            const connection = await voiceChannel.join()
            queue_constructor.connection = connection
            video_player(msg.guild, queue_constructor.songs[0], msgEmbed)
          }
          catch (err) {
            queue.delete(msg.guild.id)
            msg.channel.send("There was an error connecting!")
            throw err
          }
        } else {
          server_queue.songs.push(song)
          return msg.channel.send(`👍 **${song.title}** added to queue!`)
        }
        break
      case "SKIP": skip_song(msg, server_queue)
        break
      case "STOP": stop_song(msg, server_queue)
        break
      case "LIST": case "LS": list_song(msg, server_queue)
        break
      default:
        break
    }
  }
}

const video_player = async (guild, song, msgEmbed) => {
  const song_queue = queue.get(guild.id)

  if (!song) {
    song_queue.voide_channel.leave()
    queue.delete(guild.id)
    return
  }

  const stream = ytdl(song.url, { filter: 'audioonly' })
  song_queue.connection.play(stream, { seek: 0, volume: 1 }).on('finish', () => {
    song_queue.songs.shift()
    video_player(guild, song_queue.songs[0], msgEmbed)
  })
  await msgEmbed.setAuthor(`🎉🎉🎉 Now playing ***${song.title}*** `).setTitle(song.title)
    .setURL(song.url)
    .setFooter(`Video length: ${song.timestamp}`)

  await song_queue.text_channel.send(msgEmbed)
}

const skip_song = (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send('You need to be in a voice channel to execute this command!')
  if (!server_queue)
    return msg.channel.send("There are no songs in queue 😅")

  server_queue.connection.dispatcher.end()
}

const stop_song = (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send('You need to be in a voice channel to execute this command!')
  if (server_queue) {
    server_queue.songs = []
    server_queue.connection.dispatcher.end()
  }
  return msg.channel.send("Stop playing music 😅")
}

const list_song = async (msg, server_queue) => {
  if (!msg.member.voice.channel)
    return msg.channel.send('You need to be in a voice channel to execute this command!')
  if (!server_queue)
    return msg.channel.send("There are no songs in queue 😅")
  const res_list = "🔉 ***Playlist***\n" +
    server_queue.songs.map((el) => `Song: *${el.title}* \nLength: *${el.timestamp} min* \n`)
  return msg.channel.send(res_list.replaceAll(",Song:", "Song:"))
}
