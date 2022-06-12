let limit = 5
let handler = async (m, { conn }) => {
 
  conn.sendFile(m.chat, 'https://api.xteam.xyz/randomimage/ass?APIKEY=MahliKey', '', 'sange~an', m)
  
}
handler.command = /^(ass)$/i

handler.limit = true

module.exports = handler
