const { readdirSync } = require('node:fs');

module.exports = (client) => {
	client.handleEvents = async (eventFolders, path) => {
		for (const folder of eventFolders) {
			const eventFiles = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of eventFiles) {
				const event = require(__dirname + `/../Events/${folder}/${file}`);
				if (event.once) {
					client.once(event.name, (...args) => event.execute(...args, client));
				} else {
					client.on(event.name, (...args) => event.execute(...args, client));
				}
			}
		}
	};
};