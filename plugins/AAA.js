let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/a.mp3'
conn.sendFile(m.chat, vn, 'a.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['AAA']
handler.tags = ['voice']
handler.command = /^(aaa|AAA|Aaa)$/i

module.exports = handler
