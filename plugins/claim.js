let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/rickroll.mp3'
conn.sendFile(m.chat, vn, 'rickroll.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['Love']
handler.tags = ['voice']
handler.command = /^(claim|love|CLAIM|Claim2)$/i

module.exports = handler
