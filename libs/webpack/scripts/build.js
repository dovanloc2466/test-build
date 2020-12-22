'use strict'

const path = require('path');

const getBuildConfigs = require('../getBuildConfigs');
const build = require('../cli/build');

const args = process.argv.slice(2);
const configName = args[1];

if (!configName) {
    console.log('Missing config file path!');
    process.exit();
}

const configFile = path.resolve(process.cwd(), configName);

const option = require(configFile);
const buildConfigs = getBuildConfigs(option);

build(buildConfigs)