let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/TaTaTa.mp3'
conn.sendFile(m.chat, vn, 'TaTaTa.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}
handler.help = ['Tatata']
handler.tags = ['voice']
handler.command = /^(Tatata|tatata|TATATA)$/i

module.exports = handler
