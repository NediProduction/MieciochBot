const { EmbedBuilder } = require('discord.js');

module.exports = {
	subCommand: 'info.bot',
	async execute(interaction, client) {
		const teamName = client.config.teamName;
		const embed = new EmbedBuilder()
			.setColor('#2f3136')
			.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
			.setDescription(`Bot stworzony z ❤ przez [${teamName}](https://github.com/${teamName.replace(/\s+/g, '')}).`)
			.setFooter({ text: `Copyright © ${new Date().getFullYear()} ${teamName}` });
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};