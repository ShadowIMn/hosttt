const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('bot online!')
    client.user.setActivity(' h!help |')
  });

client.login('ODMwMTg1OTgxOTk0NzI5NTA0.YHDA8g.LLUXntz5pgdlasQBfccPN45E46Q');

client.on("message", message => {
    if (message.content.startsWith("!clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 1000 })
        })

    }
})

client.on("message", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "h!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Stato", "```" + utente.user.presence.status + "```", true)
            .addField("Bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account creato", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Entra nel server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permessi", "```" + elencoPermessi + "```", false)
            .addField("Ruoli", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)

        message.channel.send(embed)

    }
});

client.on("message", message => {
    if (message.content == "h!serverinfo") {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField("Owner", "```" + server.owner.user.username + "```", true)
            .addField("Server id", "```" + server.id + "```", true)
            .addField("Server regione", "```" + server.region + "```", true)
            .addField("Membri", "```Totali: " + server.memberCount + " - Utenti: " + utentiCount + " - Bot: " + botCount + "```", false)
            .addField("Canali", "```Categoria: " + categoryCount + " - Testo: " + textCount + " - Vocali: " + voiceCount + "```", false)
            .addField("Server createo", "```" + server.createdAt.toDateString() + "```", true)
            .addField("Livello boost", "```Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")```", true)

        message.channel.send(embed)

    }
});

