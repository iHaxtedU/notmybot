const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
message.channel.send(`Pong! \`${bot.pings[0]}ms\``);
}

module.exports.help = {
  name: "ping"
}
