const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		if (message.author.bot) return;

		const Count = 1012;
		const Deleted = message.content.slice(0, Count) + (message.content.length > Count ? ' [...]' : '');

		const Log = new MessageEmbed()
			.setColor('RED')
			.setAuthor({ name: 'Wiadomość Usunięta', iconURL: 'https://media.discordapp.net/attachments/506838906872922145/603642595419357190/messagedelete.png' })
			.setDescription(`Użytkownik ${message.author} usunął [wiadomość](${message.url}) na kanale ${message.channel}`)
			.addField('Wiadomość:', `\`\`\`${Deleted ? Deleted : 'None'}\`\`\``)
			.setFooter({ text: `Użytkownik: ${message.author.tag} | ID: ${message.author.id}` });

		if (message.attachments.size >= 1) {
			Log.addField('Załączniki:', `${message.attachments.map(a => a.url).join('\n')}`, true);
		}

		new WebhookClient({ url: 'https://discord.com/api/webhooks/982027490413387918/31PnIO3OXVnZUFVQBRVFTMf-NQW-MadHvGuQrN8MrE5eFIXik8_StBHxJSDWBHaDBRC1' }).send({ embeds: [Log] }).catch((err) => console.log(err));
	},
};