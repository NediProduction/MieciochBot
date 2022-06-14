const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testselect')
		.setDescription('testselect'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('test')
					.setPlaceholder('Wybierz coś')
					.setMaxValues(3)
					.addOptions([
						{
							label: 'test 1',
							description: 'clck test 1',
							value: 'first_option',
						},
						{
							label: 'test 2',
							description: 'click test 2',
							value: 'second_option',
						},
						{
							label: 'test 3',
							description: 'click test 3',
							value: 'third_option',
						},
					]),
			);

		await interaction.reply({ content: 'Pong!', components: [row], ephemeral: true });
	},
};