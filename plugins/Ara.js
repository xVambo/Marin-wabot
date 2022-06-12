let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Ara.mp3'
conn.sendFile(m.chat, vn, 'Ara.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['AraAra']
handler.tags = ['voice']
handler.command = /^(araara|Ara|ara|Ara|ARAARA|AraAra)$/i

module.exports = handler
