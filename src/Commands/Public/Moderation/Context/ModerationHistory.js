const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	contextMenus: 'Moderation History',
	data: new ContextMenuCommandBuilder()
		.setName('Moderation History')
		.setType(ApplicationCommandType.User)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setAuthor({ name: `${interaction.user.tag} - Informacje`, iconURL: interaction.user.displayAvatarURL() });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};