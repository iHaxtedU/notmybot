const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Starting...", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}ping`){
    message.channel.send("Pong");

  }
  if(cmd === `${prefix}contact`){
   let iUser = message.guild.member(message.mentions.users.first());
  if(!iUser) return message.channel.send("Can't Find User!");
  let iReason = args.join(" ").slice(22);
  if(!iReason) return message.channel.send("Please include a reason.")
  let msg = ("You Were Called To Encry For...");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Do Not Have This Permission");

  let contactEmbed = new Discord.RichEmbed()
  .setDescription("~You Have Been Contacted~")
  .setColor("#1eff3c")
  .addField("You Have Been Contacted For", iReason)
  .addField("Sent By", `<@${message.author.id}> with ID ${message.author.id}`);

try{
    await iUser.send(contactEmbed)
  message.channel.send("Message Successfully Sent")
  }catch(e){
    message.channel.send("You Message Could Not Be Sent Because The User Has DM's Disabled")
  }
}

  if(cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first());
  if(!kUser) return message.channel.send("Can't Find User!");
    let kReason = args.join(" ").slice(22);
  if(!kReason) return message.channel.send("Please include a reason.")
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Do Not Have This Permission");
    let gRole = message.guild.roles.find(`name`, "Guests");
    let rRole = message.guild.roles.find(`name`, "Unverified");
    
     message(kUser).addRole(rRole.id);
    message(kUser).removeRole(gRole.id);
  }
    if(cmd === `${prefix}verify`){
let iRole = message.guild.roles.find(`name`, "Guests");
    let lRole = message.guild.roles.find(`name`, "Unverified");
    
 message.member.addRole(iRole.id);
    message.member.removeRole(lRole.id);
    message.delete()
  }
  });

bot.login(process.env.botToken);
