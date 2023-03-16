require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildPresences, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
	shards: 'auto',
	restTimeOffset: 0,
	intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildPresences, MessageContent],
	partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require('./Config/config.json');
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

const { loadEvents } = require('./Handlers/Events.js');
loadEvents(client);

client.login(process.env.DISCORD_TOKEN);