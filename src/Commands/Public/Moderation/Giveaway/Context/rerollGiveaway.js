const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');
const DB = require('../../../../../Schemas/GiveawayDB');
const { endGiveaway } = require('../../../../../Utils/GiveawayFunctions');
const { successEmbeds } = require('../../../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../../../Utils/Embed/errorEmbed');

module.exports = {
	contextMenus: 'Reroll Giveaway',
	data: new ContextMenuCommandBuilder()
		.setName('Reroll Giveaway')
		.setType(ApplicationCommandType.Message)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const Message = interaction.targetMessage;
		const { id, guildId } = Message;

		const data = await DB.findOne({
			GuildID: guildId,
			MessageID: id,
		});

		if (!data) {
			const locales = { pl: 'Nie można znaleźć żadnego giveawayu o tym identyfikatorze wiadomości.' };
			const textEmbed = `${locales[interaction.locale] ?? 'Could not find any giveaway with that message ID.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		if (data.Ended === false) {
			const locales = { pl: 'Ten giveaway nie został jeszcze zakończony.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway has not ended.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		endGiveaway(Message, true);

		const locales = { pl: 'Ten giveaway został ponownie zrolowany.' };
		const textEmbed = `${locales[interaction.locale] ?? 'The giveaway has been rerolled.'}`;
		const successEmbed = await successEmbeds(textEmbed);
		return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
	},
};