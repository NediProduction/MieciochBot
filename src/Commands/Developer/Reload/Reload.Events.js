const { EmbedBuilder } = require('discord.js');
const { loadEvents } = require('../../../Handlers/Events');

module.exports = {
	subCommand: 'reload.events',
	async execute(interaction, client) {
		const locales = { pl: 'Zdarzenia bota załadowano na nowo.' };
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setFooter({ text: `${locales[interaction.locale] ?? 'Bot events reloaded.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });

		for (const [key, value] of client.events) {
			client.removeListener(`${key}`, value, true);
		}

		loadEvents(client);

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};