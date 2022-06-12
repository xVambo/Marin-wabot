let handler = async m => m.reply(`
🪄 *Marin :* a whatsapp bot\n\n🔗 *URL :* https://github.com/Vambo-M/Marin-bot
`.trim()) // repository
handler.help = ['Repo']
handler.tags = ['info']
handler.command = /^gitMarin|repo$/i

module.exports = handler
