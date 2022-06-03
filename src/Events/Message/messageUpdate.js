const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		if (oldMessage.author.bot) return;

		if (oldMessage.content === newMessage.content) return;

		const Count = 1012;
		const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1012 ? ' [...]' : '');
		const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1012 ? ' [...]' : '');

		const Log = new MessageEmbed()
			.setColor('YELLOW')
			.setAuthor({ name: 'Wiadomość Edytowana', iconURL: 'https://media.discordapp.net/attachments/506838906872922145/603643138854354944/messageupdate.png' })
			.setDescription(`Użytkownik ${newMessage.author} edytował [wiadomość](${newMessage.url}) na kanale ${newMessage.channel}`)
			.addFields(
				{ name: 'Przed:', value: `\`\`\`${Original ? Original : 'None'}\`\`\`` },
				{ name: 'Po:', value: `\`\`\`${Edited ? Edited : 'None'}\`\`\`` },
			)
			.setFooter({ text: `Użytkownik: ${newMessage.author.tag} | ID: ${newMessage.author.id}` });

		if (newMessage.attachments.size >= 1) {
			Log.addField('Załączniki:', `${newMessage.attachments.map(a => a.url).join('\n')}`, true);
		}

		new WebhookClient({ url: 'https://discord.com/api/webhooks/982027490413387918/31PnIO3OXVnZUFVQBRVFTMf-NQW-MadHvGuQrN8MrE5eFIXik8_StBHxJSDWBHaDBRC1' }).send({ embeds: [Log] }).catch((err) => console.log(err));
	},
};