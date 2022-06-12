let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let levelling = require('../lib/levelling')
const thumb = fs.readFileSync('./src/thumb.jpg')
let tags = {
  'main': '𝑴𝑨𝑰𝑵',
  'info': '𝑰𝑵𝑭𝑶',
  'game': '𝑮𝑨𝑴𝑬',
  'xp': '𝑬𝑿𝑷 & 𝑳𝑰𝑴𝑰𝑻',
  'sticker': '𝑺𝑻𝑰𝑪𝑲𝑬𝑹',
  'admin': '𝑨𝑫𝑴𝑰𝑵',
  'group': '𝑮𝑹𝑶𝑼𝑷',
  'premium': '𝑷𝑹𝑬𝑴𝑰𝑼𝑴',
  'anime': '𝑨𝑵𝑰𝑴𝑬',
  'internet': '𝑰𝑵𝑻𝑬𝑹𝑵𝑬𝑻',
  'nulis': '𝑳𝑶𝑮𝑶 & 𝑾𝑹𝑰𝑻𝑰𝑵𝑮',
  'downloader': '𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫𝑬𝑹',
  'tools': '𝑻𝑶𝑶𝑳𝑺',
  'fun': '𝑭𝑼𝑵',
  'voice' : '𝑽𝑶𝑰𝑪𝑬',
  'audio': '𝑨𝑼𝑫𝑰𝑶',
  'maker': '𝑴𝑨𝑲𝑬𝑹',
  'videomaker': '𝑽𝑰𝑫𝑬𝑶𝑴𝑨𝑲𝑬𝑹',
  'database': '𝑫𝑨𝑻𝑨𝑩𝑨𝑺𝑬',
  'exp': '𝑹𝑬𝑮𝑰𝑺𝑻𝑬𝑹',
  'vote': '𝑽𝑶𝑻𝑰𝑵𝑮',
  'absen': '𝑨𝑩𝑺𝑬𝑵𝑻',
  'jadibot': '𝑮𝑬𝑻 𝑩𝑶𝑻',
  'anonymous': '𝑨𝑵𝑶𝑵𝒀𝑴𝑶𝑼𝑺 𝑪𝑯𝑨𝑻',
  'owner': '𝑶𝑾𝑵𝑬𝑹',
  'host': '𝑯𝑶𝑺𝑻',
  'advanced': '𝑨𝑫𝑽𝑨𝑵𝑪𝑬𝑫',
}
const defaultMenu = {
  before: `

🦄 𝑃𝑟𝑒𝑓𝑖𝑥: *%p*

🌼 Left: *%limit Limit*
🌸 Role: *%role*
🌷 Level: *%level* 
🌻 Total XP: *%totalexp*

📅 Date: *%week, %date*

↓ All usable commands are listed below ↓

%readmore`.trimStart(),
  header: '---------------------------------------------------\n≪•◦%category◦•≫\n---------------------------------------------------\nㅤ',
  body: ' ❈%cmd %islimit %isPremium',
  footer: ' ',
  after: `💠 *Hope you're enjoying bot, have a great day* 
`,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return  menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.send2ButtonImg(m.chat, thumb, `𝐻𝑒𝑦𝑜! 𝐼𝑚 𝑀𝑎𝑟𝑖𝑛♥️. 𝐻𝑜𝑤 𝑐𝑎𝑛 𝑖 ℎ𝑒𝑙𝑝 𝑦𝑜𝑢?`, text.trim(), 'OWNER', '#owner', 'RULES', '#rules', m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry, the menu is in error', m)
    throw e
  }
}
handler.help = ['help/menu/?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
