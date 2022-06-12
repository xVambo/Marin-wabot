let limit = 10
let fetch = require('node-fetch')
     let handler  = async (m, { conn, usedPrefix, command }) => {
    heum = await fetch(`https://server-api-rey.herokuapp.com/api/nsfw/thighs?apikey=apirey`)
    json = await heum.buffer()
   conn.sendButtonImg(m.chat, json, '*Nyaa*', '©Marin<3', '+1', `${usedPrefix + command}`, m, false)
} 
handler.command = /^thighs$/i

handler.limit = true

module.exports = handler
