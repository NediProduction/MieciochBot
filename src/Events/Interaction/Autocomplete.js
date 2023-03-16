module.exports = {
	id: 'Interaction/Autocomplete',
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isAutocomplete()) return;

		const subCommand = interaction.options.getSubcommand(false);
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			if (subCommand) {
				const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
				await subCommandFile.autocomplete(interaction, client);
			} else {
				await command.autocomplete(interaction);
			}
		} catch (error) {
			console.error(error);
		}
	},
};
