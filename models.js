'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	author: {
		firstName: String,
		lastName: String
	},
	title: { type: String, required: true },
	content: { type: String },
	created: { type: Date, default: Date.now }
});

blogSchema.methods.serialize = function() {
	return {
		id: this._id,
		content: this.content,
		title: this.title,
		created: this.created
	};
};

const Blog = mongoose.model('blog', blogSchema, 'posts');

module.exports = { Blog };
