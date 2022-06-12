let util = require('util')
let path = require('path')

let handler = async (m, { conn }) => {
let vn = './media/Njnjnj.mp3'
conn.sendFile(m.chat, vn, 'Njnjnj.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})
}
handler.help = ['Ohayo']
handler.tags = ['voice']
handler.command = /^(Ohayo|ohayo|oyasumi|explain)$/i

module.exports = handler

