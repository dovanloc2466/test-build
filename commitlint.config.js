const { message } = require('antd');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['init', 'chore', 'fix', 'feat', 'doc', 'style', 'refactor', 'perf']]
  },
  ignores: [(message) => message.startsWith('Merge branches')]
};
