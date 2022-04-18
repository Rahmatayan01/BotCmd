const {
    WAConnection: _WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs")
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const figlet = require('figlet')
const chalk = require('chalk')
const starts = async (kimimaru = new WAConnection()) => {
	kimimaru.logger.level = 'warn'
	kimimaru.version = [2, 2210, 09]
	kimimaru.browserDescription = [ 'KimimaruBot', 'ubuntu', '3.0' ]
	kimimaru.on('qr', () => {
	console.log(color('[','white'), color('!','red'), color(']','white'), color('SCAN QR NYA'))
})
	kimimaru.on('credentials-updated', () => {
		fs.writeFileSync('./session.json', JSON.stringify(kimimaru.base64EncodedAuthInfo(), null, '\t'))
		console.log('Kurz Botz Asisstan Loading...')
	})
	fs.existsSync('./session.json') && kimimaru.loadAuthInfo('./session.json')
	kimimaru.on('connecting', () => {
		console.log('CONNECT')
	})
	kimimaru.on('open', () => {
		console.log('Tersambung')
	})
	// session
	await kimimaru.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./session.json`, JSON.stringify(kimimaru.base64EncodedAuthInfo(), null, '\t'))
kimimaru.on('chat-update', async (message) => {
        require('./kimimaru.js')(kimimaru, message)
       fake = "hahah"
    })
}
starts()