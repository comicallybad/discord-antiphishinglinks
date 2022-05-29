# discord-antiphishinglinks

## Installation:

**Node.js 17.0.0 or newer is required.**

**discord.js 13.0.0 or newer is required.**

```sh-session
npm install discord.js@latest
```
```sh-session
npm install discord-antiphishinglinks@latest
```

## Usage:

```js
const fs = require("fs");
const { config } = require("dotenv");
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,]);
const { antiPhishing } = require('discord-antiphishinglinks');

config({ path: __dirname + "/.env" });

client.login(process.env.TOKEN);

client.on('messageCreate', async message => {
    antiPhishing(message).then(res => {
        if(res){
            const logChannel = message.guild.channels.cache.find(c => c.name.includes("mod-logs"));
            //Embed example
            let embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Phishing Link Detected")
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`Phishing link detected **DO NOT** open this link!`)
                .addField('Link', `||${res.link}||`)
                .setFooter({ text: `Phishing link sent by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();

            message.channel.send({embeds: [embed]});

            if (logChannel) {
                embed.addField('User', `Link sent by ${res.message.author} (${res.message.author.id})`);
                logChannel.send({embeds: [embed]});
            }
        }
    })
})
```