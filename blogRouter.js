'use strict';

const express = require('express');
const router = express.Router();

const { Blog } = require('./models');

console.log('BLog', Blog);

router.get('/', (req, res) => {
	Blog.find()
		.limit(10)
		.then(posts => {
			console.log(posts);
			res.json({
				posts: posts.map(post => post.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: 'Internal server error' });
		});
});

module.exports = router;
