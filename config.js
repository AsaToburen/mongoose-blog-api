'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/blog-api';

exports.PORT = process.env.PORT || 8080;
