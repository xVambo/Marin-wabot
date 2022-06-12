let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/siu.mp3'
conn.sendFile(m.chat, vn, 'siu.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}
handler.help = ['Siu']
handler.tags = ['voice']
handler.command = /^(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu)$/i

module.exports = handler
