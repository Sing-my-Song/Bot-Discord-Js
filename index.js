const Database = require("@replit/database")
const Discord = require('discord.js')
const fetch = require('node-fetch')
const keepAlive = require("./server.js")

const db = new Database()
const client = new Discord.Client()

const SAD_WORD = ["sad", "depressed", "unhappy", "angry"]
const ENCOURAGEMENTS = [
  "Cheer up!",
  "Hang in there.",
  "You are a great!"
]

db.get("encouragements").then(en => {
  if (!en || en.length < 1) {
    db.set("encouragements", ENCOURAGEMENTS)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

function updateEncouragement(encouragmentsMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragmentsMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragement(index) {
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })
}

function getQuote() {
  return fetch('https://zenquotes.io/api/random').then(res =>
    res.json()
  ).then(data =>
    data[0]["q"] + " - " + data[0]["a"]
  )
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
  if (msg.author.bot) return

  if (msg.content == "$q") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  db.get("responding").then(res => {
    if (res && SAD_WORD.some(word => msg.content.includes(word))) {
      db.get("encouragements").then(encouragements => {
        const sent = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(sent)
      })
    }
  })

  if (msg.content.startsWith("$new")) {
    const enc = msg.content.split("$new ")[1];
    updateEncouragement(enc)
    msg.channel.send("New encouring message add!")
  }

  if (msg.content.startsWith("$del")) {
    const idx = parseInt(msg.content.split("$del ")[1]);
    deleteEncouragement(idx)
    msg.channel.send("Delete encouring message!")
  }

  if (msg.content.startsWith("$list")) {
    db.get("encouragements").then(encouragements => {
      msg.channel.send(encouragements)
    })
  }

  if (msg.content.startsWith("$res")) {
    const value = msg.content.split("$res ")[1];
    if (value && value.toLowerCase() === "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on.")
    } else {
      db.set("responding", false)
      msg.channel.send("Responding is off.")
    }
  }
})

keepAlive()

client.login(process.env['SMT'])
