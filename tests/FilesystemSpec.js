'use strict';

require('should');
let sinon = require('sinon');
let Filesystem = require('../Filesystem');

describe('<Unit Test>', () => {
  describe('Filesystem Spec', () => {

    it('reads file content', () => {
      let api = require('fs');
      let mock = sinon.mock(api);

      mock.expects('readFileSync').once().returns('some content');

      let filesystem = new Filesystem(api);
      filesystem.get('some-file.txt').should.be.eql('some content');

      mock.verify();
    });

    it('reads file structure recursively', () => {
      let file = new Filesystem(require('fs'));

      let result = file.getFiles(__dirname);
      result.should.be.lengthOf(1);
      result[0].should.match(/tests\/FilesystemSpec\.js/);
    });

  });
});
