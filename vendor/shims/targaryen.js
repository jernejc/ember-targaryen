(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['targaryen'] };
  }

  define('targaryen', [], vendorModule);
})();