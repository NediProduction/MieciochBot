const { EmbedBuilder } = require('discord.js');

async function successEmbeds(textEmbed) {
	const successEmbed = new EmbedBuilder()
		.setColor('#2f3136')
		.setFooter({ text: `${textEmbed}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130411282442.webp' });
	return successEmbed;
}

module.exports = { successEmbeds };