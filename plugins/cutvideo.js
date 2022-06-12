const fs = require('fs')
const { exec } = require('child_process')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) return m.reply('enter numbers')
    if (!args[1]) return m.reply('enter the number again')

    let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted } } : m
    let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
    if (/video/.test(mime)) {
      let media = await conn.downloadAndSaveMediaMessage(q)
      let out = Buffer.alloc(0)
      let ran = getRandom('.mp4')
      exec(`ffmpeg -ss ${args[0]} -i ${media} -to ${args[1]} -c copy ${ran}`, (err, stderr, stdout) => {
        fs.unlinkSync(media)
        if (err) m.reply(`_*Error!*_`)
        let buff = fs.readFileSync(ran)
        conn.sendFile(m.chat, buff, ran, 'succes memotong video🎥', m, 0, { thumbnail: Buffer.alloc(0) })
        fs.unlinkSync(ran)
      })
    } else m.reply(`Reply the video that you want to cut the video minutes with the caption *${usedPrefix}cutvideo reply 00:00:01*`)
  } catch (err) {
    m.reply(`${err}`)
  }
}
handler.help = ['cutvideo']
handler.tags = ['tools']
handler.command = /^(cutvideo)$/i

module.exports = handler

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}
