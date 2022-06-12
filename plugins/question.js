let handler = async (m, { conn, command, text }) => {
  conn.reply(m.chat, `
*⁉️ QUESTIONS ⁉️*
  
*Pregunta:* ${text}
*Answer:* ${pickRandom(['Yes','Maybe','Possibly','Probably not','No','Impossible'])}
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {})
}
handler.help = ['what <teks>?']
handler.tags = ['fun']
handler.command = /^god|question/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
