const { STOP } = require('./../utils/constants.js')

module.exports = {
  name: STOP,
  des: 'Stop the bot and leave the channel',
  async execute(msg, args) {
    const voiceChannel = msg.member.voice.channel

    if (!voiceChannel)
      return msg.channel.send('You need to be in a voice channel to stop the music!')
    await voiceChannel.leave()
    await msg.channel.send("Leaving channel :pleading_face:")
  }
}