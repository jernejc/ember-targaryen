/* eslint-env node */
'use strict';

let path = require('path');
let Funnel = require('broccoli-funnel');
let MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-targaryen',
  description: 'A wrapper for targaryen package, a library to: "Test Firebase security rules without connecting to Firebase." https://github.com/goldibex/targaryen',

  // Base idea taken from ember-sinon (https://github.com/csantero/ember-sinon)
  included: function (app) {
    this._super.included.apply(this, arguments);

    var importContext;
    if (this.import) {
      // support for ember-cli >= 2.7
      importContext = this;
    } else {
      // addon support for ember-cli < 2.7
      importContext = this._findHostForLegacyEmberCLI();
    }

    importContext.import('vendor/targaryen/targaryen.js', { type: 'test' });
    importContext.import('vendor/shims/targaryen.js', { type: 'test' });
  },

  treeForVendor: function (tree) {
    var targaryenPath = path.dirname(require.resolve('targaryen/pkg/databse/index'));
    var targaryenTree = new Funnel(targaryenPath, {
      files: ['targaryen.js'],
      destDir: '/targaryen',
    });

    var trees = [tree, targaryenTree];

    return new MergeTrees(trees, {
      annotation: 'ember-targaryen: treeForVendor'
    });
  },

  _findHostForLegacyEmberCLI: function() {
    var current = this;
    var app;

    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  }
};