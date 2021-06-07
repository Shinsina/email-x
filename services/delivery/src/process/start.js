const { filterUri } = require('@parameter1/mongodb/utils');
const db = require('../db');
const { log } = require('../utils');

const start = (promise, name, url) => {
  log(`> Connecting to ${name}...`);
  return promise.then((r) => {
    const u = typeof url === 'function' ? url(r) : url;
    log(`> ${name} connected ${u ? `(${u})` : ''}`);
    return r;
  });
};

module.exports = () => Promise.all([
  start(db.connect(), 'MongoDB', c => filterUri(c)),
]);
