let handler = async m => m.reply(`
👽 Owner is rich, he doesn't need your money.
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donate']
handler.tags = ['info']
handler.command = /^[$]/i

module.exports = handler
