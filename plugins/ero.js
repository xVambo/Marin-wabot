let limit = 5
let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
    heum = await fetch(`https://server-api-rey.herokuapp.com/api/nsfw/ero?apikey=apirey`)
    json = await heum.buffer()
   conn.sendButtonImg(m.chat, json, '*Nyaa*', '©Marin<3', '+1', `${usedPrefix + command}`, m, false)
} 
handler.command = /^ero$/i

handler.limit = true

module.exports = handler
