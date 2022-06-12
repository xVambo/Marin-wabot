let handler = m => m

handler.all = async function (m) {
    if (!m.message) return
    this.spam = this.spam ? this.spam : {}
    if (m.sender in this.spam) {
        this.spam[m.sender].count++
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 10) {
            if (this.spam[m.sender].count > 10) {
                global.db.data.users[m.sender].banned = true
               > conn.send2Button(m.chat, `𝐘𝐨𝐮 𝐠𝐨𝐭 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐨𝐫 𝐬𝐩𝐚𝐦𝐦𝐢𝐧𝐠!`, 'Calm down now!', 'OWNER', '#owner', 'CLAIM', '#claim', m)
            }
            this.spam[m.sender].count = 0
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
        }
    }
    else this.spam[m.sender] = {
        jid: m.sender,
        count: 0,
        lastspam: 0
    }
}

module.exports = handler
