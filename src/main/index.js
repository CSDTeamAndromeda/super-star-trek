const Game = require('./Game')
const prompt = require('prompt-sync')({})

// Sample demo client for Game library

console.log('Super Star Trek!')

let print = text => console.log(text)
let input = text => prompt(text)
let game = new Game(print, input)

game.start()
