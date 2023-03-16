const { model, Schema } = require('mongoose');

module.exports = model('Log', new Schema({
	GuildID: String,
	ChannelID: String,
}));