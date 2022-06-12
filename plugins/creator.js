function handler(m) {
  // Ini cuma contoh, jgn di uncomment -_-
  // F this.sendContact(m.chat, '919946958780', 'VAMBO', m)
  this.sendContact(m.chat, '919946958780', '𝐕𝐚𝐦𝐛𝐨', m)
}
handler.help = ['owner/creator']
handler.tags = ['info']

handler.command = /^(owner|creator|darling)$/i

module.exports = handler
