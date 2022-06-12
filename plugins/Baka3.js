let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Baka3.mp3'
conn.sendFile(m.chat, vn, 'Baka3.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['Baka3']
handler.tags = ['voice']
handler.command = /^(baka3|BAKA3|Baka3)$/i

module.exports = handler
