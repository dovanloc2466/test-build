'use strict'

const getBuildConfigs = require('../getBuildConfigs');
const build = require('../cli/build');

const option = {
    analyzer: true
};

const buildConfigs = getBuildConfigs(option);

build(buildConfigs);