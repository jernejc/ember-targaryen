var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'targaryen',

  treeForVendor: function(tree) {
    var packagePath = path.dirname(require.resolve('targaryen'));
    var packageTree = new Funnel(this.treeGenerator(packagePath), {
      srcDir: '/',
      destDir: 'targaryen'
    });
    
    return mergeTrees([tree, packageTree]);
  },

  included: function(app) {
    this._super.included(app);

    if (app.import) {
      this.importDependencies(app);
    }
  },

  importDependencies: function(app) {
    app.import('vendor/targaryen/index.js');
  }
};