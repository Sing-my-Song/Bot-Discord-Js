const cooldowns = new Map()

module.exports = (client, Discord, msg) => {
  const PREFIX = '-'
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return

  const args = msg.content.substring(PREFIX.length).split(/ +/)
  const cmd = args.shift().toUpperCase()

  const command = client.commands.get(cmd) ||
    client.commands.find(a => a.aliases && a.aliases.includes(cmd))
  if (command) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection())
    }

    const current_time = Date.now()
    const time_stamps = cooldowns.get(command.name)
    const cooldown_amount = command.cooldown * 1000

    if (time_stamps.has(msg.author.id)) {
      const expiration_time = time_stamps.get(msg.author.id) + cooldown_amount

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000
        return msg.reply(`Please wait ${time_left.toFixed(1)} more seconds before using command! 😎`)
      }
    }

    time_stamps.set(msg.author.id, current_time)
    setTimeout(() => time_stamps.delete(msg.author.id), cooldown_amount)
  }
  try {
    command.execute(client, msg, args, cmd, Discord)
  }
  catch (err) {
    msg.reply("There was an error trying to execute this command! 😢")
    console.log(err)
  }
}
