let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/9tMNN0N/my-dress-up-darling-11032022-0011.jpg'
	let dares = [
'𝐻𝑜𝑤 𝑚𝑎𝑦 𝑖 ℎ𝑒𝑙𝑝 𝑦𝑜𝑢?✨'
] // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `*𝑯𝒆𝒚𝒐! 𝑰𝒎 𝑀𝑎𝑟𝑖𝑛 𝐾𝑖𝑡𝑎𝑔𝑎𝑤𝑎<𝟑*\n“${pickRandom(dares)}”`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['hi']
handler.tags = ['info']
handler.command = /^(hi|hello|hey)$/i
handler.limit = false

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
