const { EmbedBuilder } = require('discord.js');
const { red } = require('chalk');
const dayjs = require('dayjs');
const DB = require('../../../Schemas/LogDB');

module.exports = {
	id: 'Message/Delete',
	name: 'messageDelete',
	async execute(message) {
		const { guild, author } = message;
		if (author === null || author.bot) return;

		DB.findOne({ GuildID: guild.id }, async (err, data) => {
			if (!data) return;

			const LogChannel = guild.channels.cache.get(data.ChannelID);

			const Count = 1012;
			const Deleted = message.content.slice(0, Count) + (message.content.length > Count ? ' [...]' : '');

			const Log = new EmbedBuilder()
				.setColor('Red')
				.setAuthor({ name: 'Wiadomość Usunięta', iconURL: 'https://media.discordapp.net/attachments/506838906872922145/603642595419357190/messagedelete.png' })
				.setDescription(`Użytkownik ${message.author} usunął wiadomość na kanale ${message.channel}.`)
				.addFields({ name: 'Wiadomość:', value: `\`\`\`${Deleted ? Deleted : 'None'}\`\`\`` })
				.setFooter({ text: `Użytkownik: ${message.author.tag} | ID: ${message.author.id}` });

			if (message.attachments.size >= 1) {
				Log.addFields({ name: 'Załączniki:', value: `${message.attachments.map(a => a.url).join('\n')}`, inline: true });
			}

			await LogChannel.send({ embeds: [Log] });

			return console.log(red.bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [${(guild.name).toUpperCase()}]: User ${author.tag} deleted message on channel "${message.channel.name}".`));
		});
	},
};