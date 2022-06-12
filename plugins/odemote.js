let handler = async (m, { conn, participants }) => {
  let members = participants.filter(member => member.isAdmin).map(member => member.jid)
  let users = m.mentionedJid.filter(user => members.includes(user))
  for (let user of users) await conn.groupDemoteAdmin(m.chat, [user]).catch(console.log)
}
handler.help = ['demote/omember/o×'].map(v => v + ' @user')
handler.tags = ['owner']

handler.command = /^(odemote|omember|o×)$/i

handler.owner = false
handler.group = true

handler.admin = true
handler.botAdmin = true

module.exports = handler