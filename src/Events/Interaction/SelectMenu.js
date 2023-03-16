const { yellow } = require('chalk');
const dayjs = require('dayjs');
const { errorEmbeds } = require('../../Utils/Embed/ErrorEmbed');

module.exports = {
	id: 'Interaction/SelectMenu',
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isSelectMenu()) return;

		const SelectMenu = client.selectMenus.get(interaction.customId);

		if (!SelectMenu) return;

		const developers = client.config.developers;

		if (SelectMenu.developer && interaction.user.id !== developers) {
			const locales = { pl: 'To polecenie jest dostępne tylko dla programisty!' };
			const textEmbed = `${locales[interaction.locale] ?? 'This command is only available to the developer!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		try {
			const Date = dayjs().format('YYYY-MM-DD HH:mm:ss >>');
			console.log(yellow.bold(`${Date} [${(interaction.guild.name).toUpperCase()}]: User ${interaction.user.tag} on channel #${interaction.channel.name} triggered an select menu "${SelectMenu.id}" --> ${interaction.values.toString()}.`));
			await SelectMenu.execute(interaction, client);
		} catch (error) {
			console.error(error);
			const locales = { pl: 'Wystąpił błąd podczas wykonywania tego polecenia!' };
			const textEmbed = `${locales[interaction.locale] ?? 'An error occurred while executing this command!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};