let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/8P075Vr/maxresdefault.jpg'
	let dares = [
'๐ป๐๐ค ๐๐๐๐ ๐ฆ๐๐ข ๐ก๐๐ ๐๐๐คจ'
] // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `โ${pickRandom(dares)}โ`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.customPrefix = /@17098009356/i
handler.command = new RegExp

handler.fail = null
handler.exp = 100
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
