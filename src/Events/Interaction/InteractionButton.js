const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;

		const button = client.buttons.get(interaction.customId);

		if (!button) return;

		try {
			console.log(chalk.yellow.bold(`[CLIENT]: ${interaction.user.tag} in #${interaction.channel.name} triggered an button.`));
			await button.execute(interaction, client);
		} catch (error) {
			console.error(error);
			const embed = new MessageEmbed()
				.setColor('#2f3136')
				.setDescription('<a:Cross_Wik:865613743907667969> **Wystąpił błąd podczas wykonywania tego polecenia!**');
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};