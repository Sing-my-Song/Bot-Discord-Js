const { HEX_TEXT } = require('./../utils/constants.js')

const queue = new Map()

module.exports = {
  name: HEX_TEXT,
  aliases: ['CRYP', 'CR'],
  cooldown: 3,
  des: 'Tranform code!',
  async execute(_, msg, args, cmd, Discord) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff').setAuthor('🔮 Encode and Decode:')
    if (args.length) {
      const prefix = args.shift()
      if (prefix.toUpperCase() === "HT" || prefix.toUpperCase() === "HEXTEXT") {
        const res = hex_to_ascii(args.join(' '))
        msgEmbed.setTitle("🗄 *Hex to Text:*").setDescription(res)
      } else if (prefix.toUpperCase() === "TH" || prefix.toUpperCase() === "TEXTHEX") {
        const res = ascii_to_hex(args.join(' '))
        msgEmbed.setTitle("🗄 *Text to Hex:*").setDescription(res)
      }
    }
    msg.channel.send(msgEmbed)
  }
}

const hex_to_ascii = (str) => {
  var hex = str.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

function ascii_to_hex(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}