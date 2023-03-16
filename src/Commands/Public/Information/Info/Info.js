const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Returns information based on the input. (Moderator)')
		.setDescriptionLocalizations({ pl: 'Zwraca informacje na podstawie danych wejściowych. (Moderator)' })
		.setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone)
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('Get information about the bot. (Moderator)')
				.setDescriptionLocalizations({ pl: 'Uzyskaj informacje o bocie. (Moderator)' }))
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Get information about user. (Moderator)')
				.setDescriptionLocalizations({ pl: 'Uzyskaj informacje o użytkowniku. (Moderator)' })
				.addUserOption(option =>
					option
						.setName('użytkownik')
						.setDescription('Wybierz użytkownika o którym chcesz dowiedzieć sie inforamcji.')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Get information about server. (Moderator)')
				.setDescriptionLocalizations({ pl: 'Uzyskaj informacje o serwerze. (Moderator)' })),
};