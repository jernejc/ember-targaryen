/* eslint-env node */
var RSVP = require('rsvp');

module.exports = {
  description: 'An ember addon wrapper for targaryen package, a library to: "Test Firebase security rules without connecting to Firebase." https://github.com/goldibex/targaryen',
  normalizeEntityName: function() {},
  afterInstall: function() {
    return RSVP.all([
      this.addPackageToProject('targaryen')
    ]);
  }
};
