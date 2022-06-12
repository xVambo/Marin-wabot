let handler = m => m

let linkRegex = /https:/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.DATABASE.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink2 && isGroupLink) {
    await m.reply(`*「 ANTI LINKS 」*\n*Goodbye baby👋, ${await this.getName(m.sender)} You broke the rules you will be exterminated....!!*`)
    await m.reply(`*You have 5 seconds to remove the link and retract...!!!!*`)
    await m.reply(`*5!!*`)
    await m.reply(`*4!!*`)
    await m.reply(`*3!!*`)
    await m.reply(`*2!!*`)
    await m.reply(`*1!!*`)
    if (isAdmin) return m.reply('*You saved yourself shit, you are admin, I cannot remove you :v*')
    if (!isBotAdmin) return m.reply('*Im not an admin, I cannot remove people 〒﹏〒*')
    let linkGC = ('https://chat.whatsapp.com/' + await this.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return m.reply('*Lol.. you sent the link of this group :v*')
    await this.groupRemove(m.chat, [m.sender])
  }
  return true
}

module.exports = handler
