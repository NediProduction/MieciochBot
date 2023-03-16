const User = require('../../Schemas/UserDB');

const cooldown = new Set();

module.exports = {
	id: 'Message/Leveling',
	name: 'messageCreate',
	async execute(message) {
		const GuildID = message.guild.id;
		const UserID = message.author.id;

		if (message.author.bot || !message.guild) return;
		if (cooldown.has(UserID)) return;

		let user;

		try {
			const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);

			user = await User.findOneAndUpdate(
				{
					GuildID,
					UserID,
				},
				{
					GuildID,
					UserID,
					$inc: { XP: xpAmount },
				},
				{ upsert: true, new: true },
			);

			let { XP, level } = user;

			if (XP >= level * 100) {
				++level;
				XP = 0;

				message.reply(`🎉 <@${UserID}>, you are now level ${level}!`);

				await User.updateOne(
					{
						GuildID,
						UserID,
					},
					{
						level,
						XP,
					},
				);
			}
		} catch (err) {
			console.log(err);
		}

		cooldown.add(message.author.id);

		setTimeout(() => {
			cooldown.delete(message.author.id);
		}, 60 * 1000);
	},
};