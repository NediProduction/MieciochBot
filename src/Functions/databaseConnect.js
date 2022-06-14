const mongoose = require('mongoose');
const { readdirSync } = require('node:fs');
const mongoEventFiles = readdirSync(__dirname + '/../Events/Database').filter(file => file.endsWith('.js'));

module.exports = (client) => {
	client.dbConnect = async () => {
		for (const file of mongoEventFiles) {
			const event = require(__dirname + `/../Events/Database/${file}`);
			if (event.once) {
				mongoose.connection.once(event.name, (...args) => event.execute(...args));
			} else {
				mongoose.connection.on(event.name, (...args) => event.execute(...args));
			}
		}
		mongoose.Promise = global.Promise;
		await mongoose.connect(process.env.MONGO_TOKEN, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	};
};