'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	author: {
		firstName: String,
		lastName: String
	},
	publishDate: { type: Date, required: true }
});

blogSchema.methods.serialize = function() {
	return {
		id: this._id,
		title: this.title,
		content: this.content,
		author: this.author,
		publishDate: this.publishDate
	};
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
