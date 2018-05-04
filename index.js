const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
let coins = require("./Tokens.json");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("All My Users", {type: "WATCHING"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let coins = require("./Tokens.json");

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
    const fs = require("fs");
    if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

    
let lCoins = coins[message.author.id].coins;
let coinUser = message.mentions.members.first();
let cuser = message.mentions.member.first();
let uCoins = coins[cuser.id].coins;

let normalCoins = new Discord.RichEmbed()
.setColor("#00FF00")
.addField("You Have", `${lCoins} Tokens!`);

let unlimitedCoins = new Discord.RichEmbed()
.setColor("#00FF00")
.addField("You Have", "∞ Tokens!");

let userCoins = new Discord.RichEmbed()
.setColor("#00FF00")
.addField("The User Has", `${uCoins} Tokens!`);

let user1Coins = new Discord.RichEmbed()
.setColor("#00FF00")
.addField("The User Has", "∞ Tokens!");;
 
if(!cuser){
if (uCoins > 1000) return message.channel.send(unlimitedCoins);
message.channel.send(normalCoins);
}
  }    

  if(cmd === `${prefix}pingme`){
    message.channel.send(`Pong! \`${bot.pings[0]}ms\``);
    }
  
     if(cmd === `${prefix}givetokens`){
   if(!message.member.roles.find("name", "gay role")) return message.channel.send("Don't Even Think About It");
  if(message.member.roles.find("name", "gay role")){
  let coins = require("./Tokens.json")
  let User = message.mentions.users.first();
  if(!User) return message.channel.send("Can't Find User!");
  let Reason = parseInt(args[1]);
  if (!Reason) return message.channel.send("You Need An Ammount To Give Them :D");
  if (isNaN(Reason)) return message.channel.send("Use Numbers Dipshit");
       
if(!coins[User.id]){
  coins[User.id] = {
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
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#0000FF")
.addField("💰", `${Reason} Tokens Added To ${User.username}'s Account!`);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}
}
     }

       if(cmd === `${prefix}taketokens`){
  let coins = require("./Tokens.json")
  let qUser = message.mentions.users.first();
  if(!qUser) return message.channel.send("Can't Find User!");
  let qReason = parseInt(args[1]);
  if (!qReason) return message.channel.send("You Need An Ammount To Give Them :D");
  if (isNaN(qReason)) return message.channel.send("Use Numbers Dipshit");
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You Do Not Have This Permission")
       
if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let coinAmt = Math.floor(Math.random() * 1) + 1;
let baseAmt = Math.floor(Math.random() * 1) + 1;


if(coinAmt === baseAmt){
  coins[qUser.id] = {
    coins: coins[qUser.id].coins -  qReason
  };
fs.writeFile("./Tokens.json", JSON.stringify(coins), (err) => {
if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#0000FF")
.addField("💰", `${qReason} Tokens Removed From ${qUser.username}'s Account!`);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
}
}
    
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
    let kUser = message.mentions.users.first();
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
  if(cmd === `${prefix}obfuscate`){
   if(!coins[message.author.id]){
    return message.reply("You don't have any coins!")
  }

  let sCoins = coins[message.author.id].coins;
  let ll = message.content.slice(prefix.length).trim().split(/ +/g);
  message.delete()
  if (!ll) return message.channel.send("Please include a hastebin on end");


  let sickEmbed = new Discord.RichEmbed()
  .setColor("#00FF00")
  .addField("You Need A Token", "You Need 1 Token");


  let newEmbed = new Discord.RichEmbed()
  .setDescription("Required")
  .setColor("#00FF00")
  .addField("Obfuscation Request", ll)
  .addField("Sent By", `<@${message.author.id}> with ID ${message.author.id}`);

  if(sCoins < 1) return message.channel.send(sickEmbed).then(msg => {msg.delete(5000)})

  message.delete()
    
    message.author.send("Your File Will Be Obfuscated In A Short Time");

    message.guild.channels.find("name", "obfuscate").send(newEmbed);

    coins[message.author.id] = {
      coins: sCoins - 1
    }


fs.writeFile("./Tokens.json", JSON.stringify(coins), (err) => {
    if(err) cosole.log(err)
  });
}

  });

bot.login(process.env.botToken);
