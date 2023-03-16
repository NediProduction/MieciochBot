const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');
const DB = require('../../../../../Schemas/GiveawayDB');
const { endGiveaway } = require('../../../../../Utils/GiveawayFunctions');
const { successEmbeds } = require('../../../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../../../Utils/Embed/errorEmbed');

module.exports = {
	contextMenus: 'End Giveaway',
	data: new ContextMenuCommandBuilder()
		.setName('End Giveaway')
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

		if (data.Ended === true) {
			const locales = { pl: 'Ten giveaway jest już zakończony.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway has already ended.'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		if (data.Paused === true) {
			const locales = { pl: 'Ten giveaway jest wstrzymany. Wznów go przed zakończeniem giveawaya.' };
			const textEmbed = `${locales[interaction.locale] ?? 'This giveaway is paused. Unpause it before ending the giveaway'}`;
			const errorEmbed = await errorEmbeds(textEmbed);
			return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		endGiveaway(Message, false);

		const locales = { pl: 'Ten giveaway dobiegł końca.' };
		const textEmbed = `${locales[interaction.locale] ?? 'The giveaway has ended.'}`;
		const successEmbed = await successEmbeds(textEmbed);
		return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
	},
};