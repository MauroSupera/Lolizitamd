const fs = require("fs");
const mek = global.mek;
const from = global.chat;
const lolizita = global.lolizita;
const _pushNames = global._pushNames;
const _messageCount = global._messageCount;

exports.enviar = (content, type, options = {}) => {
 const isFullUrl = (url) => new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/, 'gi').test(url);
 const mediaKeys = ['image',
  'video',
  'sticker',
  'audio',
  'document',
  'history',
  'md-app-state'];
 options[type || 'text'] = isFullUrl(content) && mediaKeys.includes(type) ? {
  url: content
 }: content;
 return lolizita.sendMessage(from, options, {
  quoted: mek
 });
};

// Enviar mensagens em JSON.stringify
const util = require('util');
exports.reply = (caption) => {
 try {
  lolizita.sendMessage(from, {
   text: JSON.stringify(caption, undefined, 2)
  }, {
   quoted: mek
  });
 } catch (err) {
  error = String(err);
  if (error === "TypeError: Method get TypedArray.prototype.length called on incompatible receiver [object Object]") {
   lolizita.sendMessage(from, {
    text: util.inspect(caption)
   }, {
    quoted: mek
   });
  } else {
   console.log(error);
  }
 };
}

// Mencionador
exports.mentions = (teks, memberr, id) => {
 (id == null || id == undefined || id == false) ? lolizita.sendMessage(from, {
  text: teks.trim(), mentions: memberr
 }, {
  quoted: mek
 }): lolizita.sendMessage(from, {
  text: teks.trim(), mentions: [memberr]}, {
  quoted: mek
 });
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
 fs.unwatchFile(file);
 let {
  bannerText
 } = require('../../base de dados/lib/banner');
 console.log(bannerText(`Update file: ${__filename}`).string);
 delete require.cache[file];
 require(file);
});

/* Functions by: Resen e Tobi */