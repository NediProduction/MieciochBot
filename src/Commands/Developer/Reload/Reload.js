const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { loadCommands } = require('../../../Handlers/Commands');
const { loadEvents } = require('../../../Handlers/Events');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reload bot components. (Developer)')
		.setDescriptionLocalizations({ pl: 'Przeładuj komponenty bota. (Developer)' })
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName('commands')
				.setDescription('Reload bot commands. (Developer)')
				.setDescriptionLocalizations({ pl: 'Ponowne załadowanie poleceń bota. (Developer)' }))
		.addSubcommand(subcommand =>
			subcommand
				.setName('events')
				.setDescription('Reload bot events. (Developer)')
				.setDescriptionLocalizations({ pl: 'Ponowne załadowanie zdarzeń bota. (Developer)' })),
	async execute(interaction, client) {
		const subCommand = interaction.options.getSubcommand();

		const embed = new EmbedBuilder()
			.setColor('#2f3136');

		switch (subCommand) {
			case 'events': {
				for (const [key, value] of client.events) {
					client.removeListener(`${key}`, value, true);
				}
				loadEvents(client);
				const locales = {
					pl: 'Zdarzenia bota załadowano na nowo.',
				};
				await interaction.reply({ embeds: [embed.setFooter({ text: `${locales[interaction.locale] ?? 'Bot events reloaded.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' })], ephemeral: true });
			}
				break;
			case 'commands': {
				loadCommands(client);
				const locales = {
					pl: 'Komendy bota załadowano na nowo.',
				};
				await interaction.reply({ embeds: [embed.setFooter({ text: `${locales[interaction.locale] ?? 'Bot commands reloaded.'}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' })], ephemeral: true });
			}
				break;
		}
	},
};