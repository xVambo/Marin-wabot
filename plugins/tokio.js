let handler = async m => m.reply(`
šŖ *Marin :* a whatsapp bot\n\nš *URL :* https://github.com/Vambo-M/Marin-bot
`.trim()) // repository
handler.help = ['Repo']
handler.tags = ['info']
handler.command = /^gitMarin|repo$/i

module.exports = handler
