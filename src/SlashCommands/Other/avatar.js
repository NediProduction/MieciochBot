const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Pobierz zdjęcie profilowe użytkownika serwera.')
		.addUserOption(option => option.setName('użytkownik').setDescription('Wybierz użytkownika którego wyświetlić zdjęcie profilowe.')),
	async execute(interaction) {
		const user = interaction.options.getUser('użytkownik');
		const embed = new MessageEmbed().setColor('#2f3136');
		if (user) {
			embed
				.setTitle(user.tag)
				.setDescription(`[Pobierz zdjęcie](${user.avatarURL({ format: 'png', dynamic: true, size: 4096 })})`)
				.setImage(user.avatarURL({ format: 'png', dynamic: true, size: 256 }));
			await interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			embed
				.setTitle(interaction.user.tag)
				.setDescription(`[Pobierz zdjęcie](${interaction.user.avatarURL({ format: 'png', dynamic: true, size: 4096 })})`)
				.setImage(interaction.user.avatarURL({ format: 'png', dynamic: true, size: 256 }));
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};