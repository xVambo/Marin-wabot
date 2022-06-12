let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/8P075Vr/maxresdefault.jpg'
	let dares = [
'𝐻𝑜𝑤 𝑑𝑎𝑟𝑒 𝑦𝑜𝑢 𝑡𝑎𝑔 𝒎𝒆🤨'
] // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `“${pickRandom(dares)}”`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.customPrefix = /@17098009356/i
handler.command = new RegExp

handler.fail = null
handler.exp = 100
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
