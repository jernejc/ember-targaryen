var path = require('path');
var MergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'targaryen',

  treeForVendor: function(tree) {
    var packagePath = path.dirname(require.resolve('targaryen'));
    var packageTree = new Funnel(this.treeGenerator(packagePath), {
      srcDir: '/',
      destDir: 'targaryen'
    });

    var trees = [tree, packageTree];

    return new MergeTrees(trees, {
      annotation: 'ember-targaryen: treeForVendor'
    });
  },

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

    importContext.import('vendor/targaryen/index.js', { type: 'test' });
    importContext.import('vendor/shims/targaryen.js', { type: 'test' });
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