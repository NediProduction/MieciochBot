const { EmbedBuilder } = require('discord.js');
const { yellow } = require('chalk');
const dayjs = require('dayjs');
const DB = require('../../../Schemas/LogDB');

module.exports = {
	id: 'Message/Update',
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		if (oldMessage.author === null || oldMessage.author.bot) return;
		if (oldMessage.content === newMessage.content) return;

		DB.findOne({ GuildID: oldMessage.guild.id }, async (err, data) => {
			if (!data) return;

			const LogChannel = oldMessage.guild.channels.cache.get(data.ChannelID);

			const Count = 1012;
			const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1012 ? ' [...]' : '');
			const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1012 ? ' [...]' : '');

			const Log = new EmbedBuilder()
				.setColor('Yellow')
				.setAuthor({ name: 'Wiadomość Edytowana', iconURL: 'https://media.discordapp.net/attachments/506838906872922145/603643138854354944/messageupdate.png' })
				.setDescription(`Użytkownik ${newMessage.author} edytował [wiadomość](${newMessage.url}) na kanale ${newMessage.channel}`)
				.addFields(
					{ name: 'Przed:', value: `\`\`\`${Original ? Original : 'None'}\`\`\`` },
					{ name: 'Po:', value: `\`\`\`${Edited ? Edited : 'None'}\`\`\`` },
				)
				.setFooter({ text: `Użytkownik: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

			if (newMessage.attachments.size >= 1) {
				Log.addFields({ name: 'Załączniki:', value: `${newMessage.attachments.map(a => a.url).join('\n')}`, inline: true });
			}

			await LogChannel.send({ embeds: [Log] });

			return console.log(yellow.bold(`${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [${(oldMessage.guild.name).toUpperCase()}]: User ${newMessage.author.tag} edited message on channel "${newMessage.channel.name}".`));
		});
	},
};