const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('View level')
		.setType(2),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.setAuthor({ name: `${interaction.user.tag} - Informacje`, iconURL: interaction.user.displayAvatarURL() });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};