let handler = async (m, { conn }) => {
    let user = db.data.users[m.sender]
    if (user.warning == 0) throw 'You have no warning!'

    let waktu = user.lastIstigfar + 180000
    if (new Date - user.lastIstigfar < 180000) throw `You can use this command again after ${conn.msToTime(waktu - new Date())}`
    user.warning -= 1
    m.reply(`Warning: ${user.warning} / 5`)
    user.lastIstigfar = new Date * 1
}
handler.command = /^(sorry|sowwy)$/i

handler.limit = 1

module.exports = handler
