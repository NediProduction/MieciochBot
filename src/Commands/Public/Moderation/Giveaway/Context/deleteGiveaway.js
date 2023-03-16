const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits } = require('discord.js');
const DB = require('../../../../../Schemas/GiveawayDB');
const { successEmbeds } = require('../../../../../Utils/Embed/SuccessEmbed');
const { errorEmbeds } = require('../../../../../Utils/Embed/errorEmbed');

module.exports = {
	contextMenus: 'Delete Giveaway',
	data: new ContextMenuCommandBuilder()
		.setName('Delete Giveaway')
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

		await DB.deleteOne({
			GuildID: guildId,
			MessageID: id,
		});

		await Message.delete();
		const locales = { pl: 'Giveaway został usunięty.' };
		const textEmbed = `${locales[interaction.locale] ?? 'The giveaway has been deleted.'}`;
		const successEmbed = await successEmbeds(textEmbed);
		return await interaction.reply({ embeds: [successEmbed], ephemeral: true });
	},
};