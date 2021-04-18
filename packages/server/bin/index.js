#!/usr/bin/env node
const path = require('path');
const logger = require('../script/utils/logger');
const bootstrap = require('../script')
bootstrap({
  pkgRoot: path.join(__dirname, '../'),
  workspace: process.cwd(),
  logger,
});
