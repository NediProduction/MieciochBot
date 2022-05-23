module.exports = (client) => {
	client.handleEvents = async (eventFiles) => {
		for (const file of eventFiles) {
			const event = require(__dirname + `/../Events/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			} else {
				client.on(event.name, (...args) => event.execute(...args, client));
			}
		}
	};
};