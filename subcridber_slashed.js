const Discord = require('discord.js');
const client = Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const request = require('request');
const aboneTimeout = new Discord.Collection();
const ms = require('ms');
const { SlashCommandBuilder } = require('@discordjs/builders');

client.on('ready', () => {
  const data = new SlashCommandBuilder()
	.setName('abone')
	.setDescription(`${process.env.CHANNEL_NAME} kanalının abone sayısını görürsünüz`);
	client.guilds.cache.get('your-guild-id').commands.create(data);
});

client.on('interactionCreate', interaction => {
	if(!interaction.isCommand()) return;
	if(interaction.commandName !== 'abone') return;
	if(aboneTimeout.has(interaction.member.user.id)) return interaction.reply({ content: `Biraz sakın ol dostum, ${ms(aboneTimeout.get(interaction.member.user.id) - Date.now()).replace('s', ' saniye')} beklemelisin!`, ephemeral: true });
	request({
		method: 'GET',
		url: `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.CHANNEL_ID}&key=${process.env.YTKEY}`
	}, (err, res, text) => {
		if(err){
			console.log(err);
		} else {
			var parsedText = JSON.parse(text);
			interaction.reply({ content: `${process.env.CHANNEL_NAME} kanalı şu an tam ${parsedText.items[0].statistics.subscriberCount} kadar abone sayısına sahip`, ephemeral: false });
			aboneTimeout.set(interaction.member.user.id, Date.now() + 30 * 1000);
			setTimeout(() => {
				aboneTimeout.delete(interaction.member.user.id);
			}, 30 * 1000);
		}
	});
});

client.login(token);
