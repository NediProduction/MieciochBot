const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Create or manage a giveaway. (Moderator)')
		.setDescriptionLocalizations({ pl: 'Utwórz lub zarządzaj giveawayem. (Moderator)' })
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Create a giveaway. (Moderator)')
				.setDescriptionLocalizations({ pl: 'Utwórz giveaway. (Moderator)' }),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('manage')
				.setDescription('Manage a giveaway. (Moderator)')
				.setDescriptionLocalizations({ pl: 'Zarządzaj giveawayem. (Moderator)' })
				.addStringOption(option =>
					option
						.setName('toggle')
						.setNameLocalizations({ pl: 'opcje' })
						.setDescription('Provide an option to manage.')
						.setDescriptionLocalizations({ pl: 'Wybierz opcje.' })
						.setRequired(true)
						.addChoices(
							{ name: 'end', value: 'end' },
							{ name: 'pause', value: 'pause' },
							{ name: 'unpause', value: 'unpause' },
							{ name: 'reroll', value: 'reroll' },
							{ name: 'delete', value: 'delete' },
						))
				.addStringOption(option =>
					option
						.setName('message_id')
						.setDescription('Provide the message id of the giveaway.')
						.setDescriptionLocalizations({ pl: 'Podaj identyfikator wiadomości giveawaya.' })
						.setAutocomplete(true)
						.setRequired(true)),
		),
};