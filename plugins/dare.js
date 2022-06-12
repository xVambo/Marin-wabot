let handler = async (m, { conn }) => {
	let img = 'https://i.ibb.co/10FYZ9N/images-2-4.jpg'
	let dares = [
"Are you brave enough to take a photo of a midnight graveyard?", "Take a photo of the bot, make it your profile photo for 1 day", 
"VN sing my balloon there are 5", 
"Send a message to your ex and say _I still like you_", 
"Call crush/girlfriend now and text to player", 
"Pap to a member of the group", 
"SS recent call whatsapp", 
"Send a voice note saying can I call you baby?", 
"Use Sule's photo for 3 days'", 
"Type in local language 24 hours", 
"Change name to _gue lucinta luna_ for 5 hours", 
"Chat to contact wa in the order according to your battery %, then tell him _i'm lucky to hv you_", "Prank chat with your ex and say *i love you, please come back*", "Record voice read surah al-kautsar", 
"Change name to *COCKROACH* for 24 hours", 
"Name your type of boyfriend/girlfriend!", 
"Propose Vambo",
"VN *I love you*", 
"You have to pap now!", 
"You must divide the limit, at least 2 per user", 
"Chat for 1 hour with my owner"
] // tambahin kata kata sendiri 
	conn.sendFile(m.chat, img, 'maker.jpeg', `*DARE*\n\n“${pickRandom(dares)}”`, m, false, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['dare']
handler.tags = ['fun']
handler.command = /^(dare|berani|tantangan)$/i
handler.limit = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
