const fetch = require("node-fetch")

const getDogFacts = (number = 1) => fetch(`https://dog-api.kinduff.com/api/facts?number=${number}`)
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data
  })

const getCatFacts = (number = 1) => fetch(`https://cat-fact.herokuapp.com/facts/random?amount=${number}`)
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data
  })



module.exports = {
  getDogFacts, getCatFacts
}
