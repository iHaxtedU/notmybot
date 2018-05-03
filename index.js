const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
let coins = require("./Tokens.json");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Updating..", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(cmd === `${prefix}tokens`){
    let coins = require("./Tokens.json");
    if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let uCoins = coins[message.author.id].coins;

let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("00FF00")
.addField("You Have", uCoins)

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}

  if(cmd === `${prefix}pingme`){
    message.channel.send("Pong");
    }
  
     if(cmd === `${prefix}givetokens`){
  let coins = require("./Tokens.json")
  let User = message.mentions.users.first();
  if(!User) return message.channel.send("Can't Find User!");
  let Reason = args.join(" ").slice(22);
  if (!Reason) return message.channel.send("You Need An Ammount To Give Them :D");
  if (isNaN(Reason)) return message.channel.send("Use Numbers Dipshit");
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You Do Not Have This Permission")
  if(!message.member.hasPermission("ADMINISTRATOR")) console.log(`${message.author.username} Tried To Give Himself Tokens`);
       
if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let coinAmt = Math.floor(Math.random() * 1) + 1;
let baseAmt = Math.floor(Math.random() * 1) + 1;


if(coinAmt === baseAmt){
  coins[User.id] = {
    coins: coins[User.id].coins + Reason
  };
fs.writeFile("./Tokens.json", JSON.stringify(coins), (err) => {
if (err) console.log(err)
});
    
  if(cmd === `${prefix}contact`){
  let iUser = message.guild.member(message.mentions.users.first());
  if(!iUser) return message.channel.send("Can't Find User!");
  let iReason = args.join(" ").slice(22);
  if(!iReason) return message.channel.send("Please include a reason.");
  let msg = ("You Were Called To Encry For...");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Do Not Have This Permission");

  let contactEmbed = new Discord.RichEmbed()
  .setDescription("~You Have Been Contacted~")
  .setColor("#1eff3c")
  .addField("You Have Been Contacted For", iReason)
  .addField("Sent By", `<@${message.author.id}> with ID ${message.author.id}`);

try{
    await iUser.send(contactEmbed)
  message.delete()
  message.channel.send("Message Successfully Sent")
  console.log("This User", `${message.author.username} Contacted This User ${iUser} With ${iReason}`);
  }catch(e){
    message.delete()
    message.channel.send("You Message Could Not Be Sent Because The User Has DM's Disabled")
  }
}

  if(cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first());
  if(!kUser) return message.channel.send("Can't Find User!");
    let kReason = args.join(" ").slice(22);
  if(!kReason) return message.channel.send("Please include a reason.")
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You Do Not Have This Permission");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("You Were Kicked")
    .setColor("#00FF00")
    .addField("Reason For Kick", kReason)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`);
    
    try{
    await kUser.send(kickEmbed)
    kUser.kick()
  message.channel.send("Kick Success")
  }catch(e){
    message.channel.send("Failed")
  }
 
  }
    if(cmd === `${prefix}verify`){
let iRole = message.guild.roles.find(`name`, "Guests");
    let lRole = message.guild.roles.find(`name`, "Unverified");
    
 message.member.addRole(iRole.id);
    message.member.removeRole(lRole.id);
    message.delete()
  }
  if(cmd === `${prefix}coinfile`){
  const Discord = require("discord.js");

if (message.author.id === "366054247185514516"){
message.author.send(`Here is the current coin file`, {
  files: [
    "./Tokens.json"
  ]
})}
 let blacklist = (message.author.id === "366054247185514516");
    if (!blacklist) return message.channel.send("This command is for Ez Potato only.")
}

  });

bot.login(process.env.botToken);
