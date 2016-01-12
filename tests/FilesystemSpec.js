'use strict';

require('should');
var sinon = require('sinon');
var Filesystem = require('../Filesystem');

describe('<Unit Test>', function () {
  describe('Filesystem Spec', function () {

    it('reads file content', function () {
      var api = require('fs');
      var mock = sinon.mock(api);

      mock.expects('readFileSync').once().returns('some content');

      var filesystem = new Filesystem(api);
      filesystem.get('some-file.txt').should.be.eql('some content');

      mock.verify();
    });

  });
});
