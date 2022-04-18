const { MessageType, WAMessageProto, Presence, MessageOptions, WA_DEFAULT_EPHEMERAL, Mimetype, Browsers, WALocationMessage, WA_MESSAGE_STUB_TYPES, ReconnectMode, ProxyAgent, GroupSettingChange, waChatKey, mentionedJid, processTime } = require("@adiwajshing/baileys")
const {text, document, location, liveLocation, contact, contactsArray, buttonsMessage, listMessage, video, sticker, audio, product, extendedText, groupInviteMessage } = MessageType
const {color} = require('./lib/color')
const {getBuffer} = require('./lib/functions')
const {fetchJson} = require('./lib/fetcher')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'))
let ownerNumber = config.ownerNumber
autojoin = false
const msga = (message) => {
if (message.length >= 10){
return `${message.slice(0, 10)}`
}else{
return `${message}`
}
}

const scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))

const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    scommand.push(obj)
    fs.writeFileSync('./database/scommand.json', JSON.stringify(scommand))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(scommand).forEach((i) => {
        if (scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}
const getCmd = (id) => {
    let position = null
    Object.keys(scommand).forEach((i) => {
        if (scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return scommand[position].chats
    }
}
module.exports = kimimaru = async(kimimaru, mek) => {
try {
if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 12) return
const isGroup = mek.key.remoteJid.endsWith('g.us')
const content = JSON.stringify(mek.message)
const sender = mek.key.fromMe ? kimimaru.user.jid : isGroup ? mek.participant : mek.key.remoteJid
var from = mek.key.remoteJid
const groupMetadata = isGroup ? await kimimaru.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const type = Object.keys(mek.message)[0]
const pushname = (sender === kimimaru.user.jid) ? kimimaru.user.name : kimimaru.contacts[sender].notify || kimimaru.contacts[sender].vname || 'Tidak Terbaca'
budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
prefix = /^[°zZ•π.'":÷×¶∆£¢€¥®™✓=;~ |!+<?#$%^&\/\\©^]/.test(budy) ? budy.match(/^[°zZ•π.'":÷×¶∆£¢€¥®™✓=;~ |!+<?#$%^&\/\\©^]/gi)[0] : '#'
 button = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
 template = (type === "templateButtonReplyMessage") && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : ''
 body = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)
const isOwner = ownerNumber.includes(sender)
const arg = body.slice(command.length+2)
const c = args.join(' ')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const reply = async(teks) => {
 kimimaru.sendMessage("6285752765133@s.whatsapp.net", teks, text, {quoted: mek})
} 
 if (isGroup && autojoin == true) {
if (budy.includes("https://chat.whatsapp.com/")) {
console.log(color("[AUTO-JOIN]", "red"),);
kimimaru.query({
  json: [
"action",
"invite",
`${budy.replace("https://chat.whatsapp.com/", "")}`,
  ],
});
}
}
if (isOwner){
if (budy.toLowerCase() === '😔'){
autojoin = true
kimimaru.sendMessage("6285752765133@s.whatsapp.net", `Autojoin Aktif`, MessageType.text, {})
}}
if (isOwner){
if (budy.toLowerCase() === '😡'){
autojoin = false
kimimaru.sendMessage("6285752765133@s.whatsapp.net", `Autojoin Nonaktif`, MessageType.text, {})
}}
switch (command) {
case 'addcmd': 
case 'setcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
if (isQuotedSticker) {
if (!c) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, c)
reply("Done Bwang")
} else {
reply('tag stickenya')
}
break
case 'delcmd':
if (!isOwner && !mek.key.fromMe) return reply(mess.only.ownerB)
if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./database/scommand.json', JSON.stringify(scommand))
reply("Done")
break
case 'tes':
reply("On")
break
case 'on':
if (!mek.key.fromMe) return reply(mess.only.ownerB)
autojoin = true
reply("Autojoin Aktif")
break
case 'off':
if (!mek.key.fromMe) return reply(mess.only.ownerB)
autojoin = false
reply("Autojoin Nonaktif")
break
}
}catch (e) {
console.log(String(e))
}
}
