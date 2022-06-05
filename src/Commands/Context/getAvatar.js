const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get avatar')
		.setType(2),
	async execute(interaction) {
		const target = interaction.guild.members.cache.get(interaction.targetId);

		const embed = new MessageEmbed()
			.setColor('#2f3136')
			.setTitle(target.user.tag)
			.setDescription(`[Pobierz zdjęcie](${target.user.avatarURL({ format: 'png', dynamic: true, size: 4096 })})`)
			.setImage(target.user.avatarURL({ format: 'png', dynamic: true, size: 256 }));
		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};