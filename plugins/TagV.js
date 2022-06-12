let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]

  conn.reply(m.chat, `
𝐷𝑜𝑛𝑡 𝑡𝑎𝑔 𝑚𝑦 𝑫𝒂𝒓𝒍𝒊𝒏𝒈!😑
`.trim(), m)
    let mentionedJid = [m.sender]
}
handler.customPrefix = /@919946958780/i
handler.command = new RegExp

module.exports = handler
