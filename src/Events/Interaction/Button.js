const { yellow } = require('chalk');
const dayjs = require('dayjs');
const { errorEmbeds } = require('../../Utils/Embed/ErrorEmbed');

module.exports = {
	id: 'Interaction/Button',
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;

		const Button = client.buttons.get(interaction.customId);

		if (!Button) return;

		const developers = client.config.developers;

		if (Button.developer && interaction.user.id !== developers) {
			const locales = { pl: 'To polecenie jest dostępne tylko dla programisty!' };
			const textEmbed = `${locales[interaction.locale] ?? 'This command is only available to the developer!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		try {
			const Date = dayjs().format('YYYY-MM-DD HH:mm:ss >>');
			console.log(yellow.bold(`${Date} [${(interaction.guild.name).toUpperCase()}]: User ${interaction.user.tag} on channel #${interaction.channel.name} triggered an button "${Button.id}".`));
			await Button.execute(interaction, client);
		} catch (error) {
			console.error(error);
			const locales = { pl: 'Wystąpił błąd podczas wykonywania tego polecenia!' };
			const textEmbed = `${locales[interaction.locale] ?? 'An error occurred while executing this command!'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};