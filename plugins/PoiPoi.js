let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/PoiPoi.mp3'
conn.sendFile(m.chat, vn, 'PoiPoi.mp3', null, m, true, {
type: 'audioMessage', // paksa tanpa convert di ffmpeg
ptt: true // true diatas ga work, sebab dipaksa tanpa convert ;v
})
}
handler.help = ['PoiPoi']
handler.tags = ['voice']
handler.command = /^(poipoi|POIPOI|Poipoi)$/i

module.exports = handler
