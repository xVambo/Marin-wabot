let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/c6Gp4yW/images-31.jpg'
	let dares = [
"𝑽𝒂𝒎𝒃𝒐𝒐,𝑴𝒚 𝒇𝒂𝒗💕"
] // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `“${pickRandom(dares)}”`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['Vambo']
handler.tags = ['info']
handler.command = /^(Vambo|vambo|dambo|vamboo|vambooo|bambo|jambo)$/i
handler.limit = false

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
