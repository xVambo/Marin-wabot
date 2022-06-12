let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role } = global.DATABASE.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let str = `
┏━━°❀❬ *PROFILE* ❭❀°━━┓
┃
┃• *🌸Name🌸 :* ${username} 
┃• *🔰 Tag 🔰 :* @${who.replace(/@.+/, '')}${about ? 
'\n┃• *🥀Description :* ' + about : ''}
┃• *✨Number :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
┃• *❄️Link :* wa.me/${who.split`@`[0]}
${registered ? '┃•🎈Age: ' + age : ''}
┃•🍀XP : ${exp} (${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to levelup`})
┃•🦄Level : ${level}
┃•⚔️Role : ${role}
┃•🪄Limit : ${limit} 
${lastclaim > 0 ? '┃•🍁Last Claim: ' + new Date(lastclaim) : ''}
┃•🔏Registered: ${registered ? 'Yes (' + new Date(regTime) + ')': 'No'}
┃•🏮Premium: ${prem ? 'Yes' : 'No'}
┗━━━━━━━━━━━━━━━━━━
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^(p|profile)$/i
module.exports = handler
