let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Yatta.mp3'
conn.sendFile(m.chat, vn, 'Yatta.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['Yatta']
handler.tags = ['voice']
handler.command = /^(yatta|Yatta|YATTA)$/i

module.exports = handler
