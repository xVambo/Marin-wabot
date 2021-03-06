let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let levelling = require('../lib/levelling')
const thumb = fs.readFileSync('./src/thumb.jpg')
let tags = {
  'main': '๐ด๐จ๐ฐ๐ต',
  'info': '๐ฐ๐ต๐ญ๐ถ',
  'game': '๐ฎ๐จ๐ด๐ฌ',
  'xp': '๐ฌ๐ฟ๐ท & ๐ณ๐ฐ๐ด๐ฐ๐ป',
  'sticker': '๐บ๐ป๐ฐ๐ช๐ฒ๐ฌ๐น',
  'admin': '๐จ๐ซ๐ด๐ฐ๐ต',
  'group': '๐ฎ๐น๐ถ๐ผ๐ท',
  'premium': '๐ท๐น๐ฌ๐ด๐ฐ๐ผ๐ด',
  'anime': '๐จ๐ต๐ฐ๐ด๐ฌ',
  'internet': '๐ฐ๐ต๐ป๐ฌ๐น๐ต๐ฌ๐ป',
  'nulis': '๐ณ๐ถ๐ฎ๐ถ & ๐พ๐น๐ฐ๐ป๐ฐ๐ต๐ฎ',
  'downloader': '๐ซ๐ถ๐พ๐ต๐ณ๐ถ๐จ๐ซ๐ฌ๐น',
  'tools': '๐ป๐ถ๐ถ๐ณ๐บ',
  'fun': '๐ญ๐ผ๐ต',
  'voice' : '๐ฝ๐ถ๐ฐ๐ช๐ฌ',
  'audio': '๐จ๐ผ๐ซ๐ฐ๐ถ',
  'maker': '๐ด๐จ๐ฒ๐ฌ๐น',
  'videomaker': '๐ฝ๐ฐ๐ซ๐ฌ๐ถ๐ด๐จ๐ฒ๐ฌ๐น',
  'database': '๐ซ๐จ๐ป๐จ๐ฉ๐จ๐บ๐ฌ',
  'exp': '๐น๐ฌ๐ฎ๐ฐ๐บ๐ป๐ฌ๐น',
  'vote': '๐ฝ๐ถ๐ป๐ฐ๐ต๐ฎ',
  'absen': '๐จ๐ฉ๐บ๐ฌ๐ต๐ป',
  'jadibot': '๐ฎ๐ฌ๐ป ๐ฉ๐ถ๐ป',
  'anonymous': '๐จ๐ต๐ถ๐ต๐๐ด๐ถ๐ผ๐บ ๐ช๐ฏ๐จ๐ป',
  'owner': '๐ถ๐พ๐ต๐ฌ๐น',
  'host': '๐ฏ๐ถ๐บ๐ป',
  'advanced': '๐จ๐ซ๐ฝ๐จ๐ต๐ช๐ฌ๐ซ',
}
const defaultMenu = {
  before: `

๐ฆ ๐๐๐๐๐๐ฅ: *%p*

๐ผ Left: *%limit Limit*
๐ธ Role: *%role*
๐ท Level: *%level* 
๐ป Total XP: *%totalexp*

๐ Date: *%week, %date*

โ All usable commands are listed below โ

%readmore`.trimStart(),
  header: '---------------------------------------------------\nโชโขโฆ%categoryโฆโขโซ\n---------------------------------------------------\nใค',
  body: ' โ%cmd %islimit %isPremium',
  footer: ' ',
  after: `๐  *Hope you're enjoying bot, have a great day* 
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
    conn.send2ButtonImg(m.chat, thumb, `๐ป๐๐ฆ๐! ๐ผ๐ ๐๐๐๐๐โฅ๏ธ. ๐ป๐๐ค ๐๐๐ ๐ โ๐๐๐ ๐ฆ๐๐ข?`, text.trim(), 'OWNER', '#owner', 'RULES', '#rules', m)
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
