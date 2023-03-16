const chalk = require('chalk');
const dayjs = require('dayjs');

async function loadEvents(client) {
	const { loadFiles } = require('../Functions/fileLoader.js');
	const ascii = require('ascii-table');
	const table = new ascii().setHeading('Events', 'Status');

	await client.events.clear();

	const Files = await loadFiles('Events');

	Files.forEach((file) => {
		const event = require(file);
		const execute = (...args) => event.execute(...args, client);
		client.events.set(event.name, execute);

		if (event.rest) {
			if (event.once) {
				client.rest.once(event.name, execute);
			} else {
				client.rest.on(event.name, execute);
			}
		} else if (event.once) {
			client.once(event.name, execute);
		} else {
			client.on(event.name, execute);
		}

		table.addRow(event.id, '🟩');
	});

	return console.log(table.toString(), chalk.green.bold(`\n${dayjs().format('YYYY-MM-DD HH:mm:ss >>')} [CLIENT]: Successfully loaded application events.`));
}

module.exports = { loadEvents };