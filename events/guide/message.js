module.exports = (client, Discord, msg) => {
  const PREFIX = '-'
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return

  const args = msg.content.substring(PREFIX.length).split(/ +/)
  const cmd = args.shift().toUpperCase()

  const command = client.commands.get(cmd)

  if (command)
    command.execute(client, msg, args, Discord)
}
