let handler = async (m, { conn, command, usedPrefix, text }) => {
    let which = command.replace(/get/i, '')
    if (!text) throw `use *${usedPrefix}list${which}* to see the list`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) throw `'${text}' not listed in the message list`
    let _m = conn.serializeM(JSON.parse(JSON.stringify(msgs[text]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
            return Buffer.from(v.data)
        }
        return v
    }))
    // m.reply(`[debug]\n${require('util').format(_m)}`)
}
handler.help = ['vn', 'msg', 'video', 'gif', 'audio', 'img', 'sticker'].map(v => 'get' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^get(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler
