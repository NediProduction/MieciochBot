const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get information about the current bot latency. (Developer)')
		.setDescriptionLocalizations({
			pl: 'Uzyskaj informacje o aktualnym opóźnieniu bota. (Developer)',
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setDescription('**Pingowanie...**');
		const locales = {
			pl: '**Opóźnienie bota:** ',
		};
		const sent = await interaction.reply({ embeds: [embed], fetchReply: true, ephemeral: true });
		interaction.editReply({ embeds: [embed.setDescription(`${locales[interaction.locale] ?? '**Bot latency:** '}${sent.createdTimestamp - interaction.createdTimestamp}ms`)] });
	},
};