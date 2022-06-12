let R = Math.random
let Fl = Math.floor
let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.jid)
    let a = ps[Fl(R() * ps.length)]
    let b
    do b = ps[Fl(R() * ps.length)]
    while (b === a)
    m.reply(`*_Hey ${toM(a)}, you should marry 💍 ${toM(b)}💞_*`, null, {
        contextInfo: {
            mentionedJid: [a, b],
        }
    })
}
handler.help = ['findcouple']
handler.tags = ['main']
handler.command = ['findcouple','findcouples']
handler.group = true

module.exports = handler
