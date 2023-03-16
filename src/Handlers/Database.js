const mongoose = require('mongoose');

async function loadDatabase() {
	const { loadFiles } = require('../Functions/fileLoader.js');

	const Files = await loadFiles('Events/Database');

	Files.forEach((file) => {
		const event = require(file);
		if (event.once) {
			mongoose.connection.once(event.name, (...args) => event.execute(...args));
		} else {
			mongoose.connection.on(event.name, (...args) => event.execute(...args));
		}
	});
	mongoose.Promise = global.Promise;
	await mongoose.connect(process.env.MONGO_TOKEN, {
		dbName: 'Mięcioch',
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
}

module.exports = { loadDatabase };