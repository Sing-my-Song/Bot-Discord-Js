const Discord = require('discord.js')
const keepAlive = require("./server.js")

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

const handlers = ['command_handler', 'event_handler']
handlers.forEach(e =>
  require(`./handlers/${e}`)(client, Discord)
)

// keep bot running
keepAlive()

client.login(process.env['TKN'])
