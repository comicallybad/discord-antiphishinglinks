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
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { antiPhishing } = require('discord-antiphishinglinks');

client.login("BOT-TOKEN");

client.on('messageCreate', async message => {
    //This  is good practice to check
    if (!message || !message.guild) return;
    if (!message.member) message.member = await message.guild.members.fetch(message).catch(err => err);

    antiPhishing(message).then(found => {
        //If a phishing link is found
        if(found){
            //Optional search for a log channel
            const logChannel = message.guild.channels.cache.find(c => c.name.includes("mod-logs"));

            //Delete user's phishing message
            message.delete().catch(err => err);     //Catch in case of "Unknown Message" error.

            //Embed example with link marked as a spoiler
            let embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("Phishing Link Detected")
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`Phishing link detected **DO NOT** open this link!`)
                .addField('Link', `||${found.link}||`)
                .setFooter({ text: `Phishing link sent by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();

            //Send channel the Phishing Warning Embed
            message.channel.send({embeds: [embed]});

            //If log channel is found
            if (logChannel) {
                //Add a field with more user information: 
                //      message.author is an @ mention, therefore; clickable for easy banning
                embed.addField('User', `Link sent by ${message.author} (${message.author.id})`);
                return logChannel.send({embeds: [embed]});
            } else return 
        }
    });
});
```