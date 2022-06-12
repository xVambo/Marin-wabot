let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Shine.mp3'
conn.sendFile(m.chat, vn, 'Shine.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}
handler.help = ['Shine']
handler.tags = ['voice']
handler.command = /^(Shine|shinee|shineee)$/i

module.exports = handler
