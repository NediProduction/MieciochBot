const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			console.log(chalk.yellow.bold(`[CLIENT]: ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`));
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			const embed = new MessageEmbed()
				.setColor('#2f3136')
				.setDescription('<a:Cross_Wik:865613743907667969> **Wystąpił błąd podczas wykonywania tego polecenia!**');
			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
	},
};

/* const embed = new MessageEmbed()
 *	.setColor('#2f3136')
 *	.setTitle('Polecenie Interakcji')
 *	.setFields(
 *		{ name: 'Użykownik:', value: `${interaction.guild.members.cache.get(interaction.user.id)}`, inline: true },
 *		{ name: '\u200B', value: '\u200B', inline: true },
 *		{ name: 'ID Użytkownika:', value: `\`${interaction.user.id}\``, inline: true },
 *		{ name: 'Kanał:', value: `${interaction.guild.channels.cache.get(interaction.channel.id)}`, inline: true },
 *		{ name: '\u200B', value: '\u200B', inline: true },
 *		{ name: 'Data:', value: `<t:${parseInt(interaction.createdTimestamp / 1000)}:f>`, inline: true },
 *		{ name: 'Komenda:', value: `\`\`\`/${interaction.commandName}\`\`\`` },
 *	);
 */
