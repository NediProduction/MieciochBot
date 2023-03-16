const { EmbedBuilder } = require('discord.js');
const { loadCommands } = require('../../../Handlers/Commands');

module.exports = {
	subCommand: 'reload.commands',
	async execute(interaction, client) {
		const locales = { pl: 'Komendy bota załadowano na nowo.' };
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setFooter({ text: `${locales[interaction.locale] ?? 'Bot commands reloaded.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });

		loadCommands(client);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};