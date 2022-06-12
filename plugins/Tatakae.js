let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Tatakae.mp3'
conn.sendFile(m.chat, vn, 'Tatakae.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['Tatakae']
handler.tags = ['voice']
handler.command = /^(tatakae|TATAKAE|Tatakae)$/i

module.exports = handler
