# discord-simple-anti-phishing

## Installation:

**Node.js 17.0.0 or newer is required.**

**discord.js 13.0.0 or newer is required.**

```sh-session
npm install discord.js@latest
```
```sh-session
npm install discord-simple-anti-phishing
```

## Usage:

```js
const fs = require("fs");
const { config } = require("dotenv");
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,]);
const { antiPhishing } = require('discord-simple-anti-phishing');

config({ path: __dirname + "/.env" });

client.login(process.env.TOKEN);

client.on('messageCreate', async message => {
    antiPhishing(message).then(res => {
        if(res){
            //Embed example
        let embed = new MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Phishing Link Detected")
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`Phishing link detected: ||${res.link}|| **DO NOT** open this link!`)
            .setFooter({ text: `Phishing link sent by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

            message.channel.send({embeds: [embed]});
        }
    })
})
```