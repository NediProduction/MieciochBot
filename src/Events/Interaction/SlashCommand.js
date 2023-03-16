const { yellow } = require('chalk');
const dayjs = require('dayjs');
const { errorEmbeds } = require('../../Utils/Embed/ErrorEmbed');

module.exports = {
	id: 'Interaction/SlashCommands',
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		const developers = client.config.developers;

		if (command.developer && interaction.user.id !== developers) {
			const locales = { pl: 'To polecenie jest dostępne tylko dla programisty!' };
			const textEmbed = `${locales[interaction.locale] ?? 'This command is only available to the developer!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		try {
			const Date = dayjs().format('YYYY-MM-DD HH:mm:ss >>');
			const subCommand = interaction.options.getSubcommand(false);

			if (interaction.isContextMenuCommand()) {
				console.log(yellow.bold(`${Date} [${(interaction.guild.name).toUpperCase()}]: User ${interaction.user.tag} on channel #${interaction.channel.name} triggered an context menu "${interaction.command.name}".`));
				await command.execute(interaction, client);
			} else if (subCommand) {
				console.log(yellow.bold(`${Date} [${(interaction.guild.name).toUpperCase()}]: User ${interaction.user.tag} on channel #${interaction.channel.name} triggered an interaction /${interaction.command.name} ${subCommand}.`));
				const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
				await subCommandFile.execute(interaction, client);
			} else {
				console.log(yellow.bold(`${Date} [${(interaction.guild.name).toUpperCase()}]: User ${interaction.user.tag} on channel #${interaction.channel.name} triggered an interaction /${interaction.command.name}.`));
				await command.execute(interaction, client);
			}
		} catch (error) {
			console.error(error);
			const locales = { pl: 'Wystąpił błąd podczas wykonywania tego polecenia!' };
			const textEmbed = `${locales[interaction.locale] ?? 'An error occurred while executing this command!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};
