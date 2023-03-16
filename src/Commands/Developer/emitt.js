const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName('emitt')
		.setDescription('Event emitter. (Developer)')
		.setDescriptionLocalizations({ pl: 'Emiter zdarzeń. (Developer)' })
		.addStringOption(option =>
			option.setName('użytkownik')
				.setDescription('Wydarzenia dla członków serwera.')
				.setRequired(true)
				.addChoices(
					{ name: 'guildMemberAdd', value: 'guildMemberAdd' },
					{ name: 'guildMemberRemove', value: 'guildMemberRemove' },
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, client) {
		const choices = interaction.options.getString('użytkownik');

		switch (choices) {
			case 'guildMemberAdd': {
				client.emit('guildMemberAdd', interaction.member);
				interaction.reply({ content: 'Emitowano wydarzenie.', ephemeral: true });
			}
				break;
			case 'guildMemberRemove': {
				client.emit('guildMemberRemove', interaction.member);
				interaction.reply({ content: 'Emitowano wydarzenie.', ephemeral: true });
			}
				break;
		}
	},
};