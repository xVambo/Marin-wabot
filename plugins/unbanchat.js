let handler = async (m, { conn }) => {
  global.db.data.chats[m.chat].isBanned = false
  m.reply('OHAYOO!!💞')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^(unbanchat|wakeup)$/i
handler.owner,handler.mods = true

module.exports = handler
