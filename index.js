const Discord = require('discord.js')
const fs = require('fs')
const CONSTANTS = require('./utils/constants.js')
// const keepAlive = require("./server.js")

const PREFIX = '-'
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.commands = new Discord.Collection()
for (const file of cmdFiles) {
  const cmd = require(`./commands/${file}`)
  client.commands.set(cmd.name, cmd)
}


client.on("ready", () => {
  console.log(`======== Logged in as ${client.user.tag} ========`)
})

client.on('message', (msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return

  const args = msg.content.substring(PREFIX.length).split(" ")
  const cmd = args.shift().toUpperCase()
  switch (cmd) {
    case CONSTANTS.HI:
      client.commands.get(CONSTANTS.HI).execute(msg, args)
      break
    case CONSTANTS.CLEAR:
      client.commands.get(CONSTANTS.CLEAR).execute(msg, args)
      break;
    case CONSTANTS.PLAY:
      client.commands.get(CONSTANTS.PLAY).execute(msg, args)
      break;
    case CONSTANTS.STOP:
      client.commands.get(CONSTANTS.STOP).execute(msg, args)
    default:
      break
  }
})

// keep client running
// keepAlive()

client.login(process.env['TKN'])
