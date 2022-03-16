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
const client = new Client({ intents: intents, partials: ['GUILD_MEMBER', 'REACTION', 'CHANNEL', 'MESSAGE'] });
const { antiPhishing } = require('discord-simple-anti-phishing');

config({ path: __dirname + "/.env" });

client.login(process.env.TOKEN);

client.on('messageCreate', async message => {
    antiPhishing(message).then(res => {
        if(res){
            //Embed example
            let embed = new MessageEmbed() 
            .setColor("#FF0000)    
            .setTitle("Phishing Link Detected")     
            .setDescription("A phishing link has been detected.") 
            .addField'User:',  `${res.message.author} ${res.message.author.id}`)
            .addField('Link:', `||${res.link}||`)
            .setThumbnail(res.message.author.displayAvatarURL());

            message.channel.send({embeds: [embed]});
        }
    })
})
```