let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Yamete.mp3'
conn.sendFile(m.chat, vn, 'Yamete.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['death']
handler.tags = ['voice']
handler.command = /^(death|Death|DEATH?$)/

module.exports = handler
