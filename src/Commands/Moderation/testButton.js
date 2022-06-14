const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testbutton')
		.setDescription('testbutton'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('test button')
					.setLabel('Testowy Przycisk')
					.setStyle('PRIMARY')
					.setEmoji('1️⃣'),
				new MessageButton()
					.setCustomId('test button 2')
					.setLabel('Testowy Przycisk')
					.setStyle('SECONDARY')
					.setEmoji('2️⃣'),
				new MessageButton()
					.setCustomId('test button 3')
					.setLabel('Testowy Przycisk')
					.setStyle('SUCCESS')
					.setEmoji('3️⃣'),
				new MessageButton()
					.setCustomId('test button 4')
					.setLabel('Testowy Przycisk')
					.setStyle('DANGER')
					.setEmoji('4️⃣'),
				new MessageButton()
					.setURL('https://www.twitch.tv/zawistnydiabel')
					.setLabel('Testowy Przycisk')
					.setStyle('LINK')
					.setEmoji('5️⃣'),
			);

		await interaction.reply({ content: 'Pong!', components: [row], ephemeral: true });
	},
};