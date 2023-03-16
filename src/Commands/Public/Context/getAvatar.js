const { EmbedBuilder, ContextMenuCommandBuilder } = require('discord.js');

module.exports = {
	contextMenus: 'Get avatar',
	data: new ContextMenuCommandBuilder()
		.setName('Get avatar')
		.setType(2)
		.setDMPermission(false),
	async execute(interaction) {
		const target = interaction.guild.members.cache.get(interaction.targetId);

		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setTitle(target.user.tag)
			.setDescription(`[Pobierz zdjęcie](${target.user.avatarURL({ format: 'png', dynamic: true, size: 4096 })})`)
			.setImage(target.user.avatarURL({ format: 'png', dynamic: true, size: 256 }));
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};