const Scraper = require('images-scraper');
const { IMAGE } = require('./../utils/constants.js')

const google = new Scraper({
  puppeteer: {
    headless: true,
  },
});

module.exports = {
  name: IMAGE,
  des: "Send an image to a discord text channel",
  async execute(_, msg, args) {
    const image_query = args.join(' ')

    if (!image_query)
      return msg.channel.send("Please enter an image name")

    const img_res = await google.scrape(image_query, 1)

    msg.channel.send(img_res[0].url)
  }
}