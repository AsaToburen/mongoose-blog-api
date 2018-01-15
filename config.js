'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog-api';

console.log('exports', exports.DATABASE_URL);

exports.PORT = process.env.PORT || 8080;
