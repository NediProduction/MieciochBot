const { EmbedBuilder } = require('discord.js');

async function errorEmbeds(textEmbed) {
	const errorEmbed = new EmbedBuilder()
		.setColor('#2f3136')
		.setFooter({ text: `${textEmbed}`, iconURL: 'https://cdn.discordapp.com/emojis/859388130636988436.webp' });
	return errorEmbed;
}

module.exports = { errorEmbeds };