const { model, Schema } = require('mongoose');

module.exports = model('User', new Schema({
	GuildID: { type: String, require: true },
	UserID: { type: String, require: true },
	XP: { type: Number, default: 0 },
	Level: { type: Number, default: 1 },
}));