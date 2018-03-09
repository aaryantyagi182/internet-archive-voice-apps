/**
 * integration tests for repeat
 */

const {expect} = require('chai');
var index, configStub, adminInitStub, functions, admin;
const {buildIntentRequest, MockResponse} = require('../_utils/mocking');
const sinon = require('sinon');

describe('integration', () => {
  before(() => {
    admin = require('firebase-admin');
    adminInitStub = sinon.stub(admin, 'initializeApp');
    // Next we stub functions.config(). Normally config values are loaded from Cloud Runtime Config;
    // here we'll just provide some fake values for firebase.databaseURL and firebase.storageBucket
    // so that an error is not thrown during admin.initializeApp's parameter check
    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns(require(`../../../.runtimeconfig.json`));
    index = require('../..');
  });
  describe('welcome', () => {
    it('should handle for a new user', () => {
      const res = new MockResponse();
      index.playMedia(buildIntentRequest({
        action: 'welcome',
        lastSeen: null,
      }), res);
      expect(res.speech()).to.not.contain('Welcome back,');
      expect(res.speech()).to.contain('Welcome to music at the Internet Archive.');
    });

    it('should handle for return user', () => {
      const res = new MockResponse();
      index.playMedia(buildIntentRequest({
        action: 'welcome',
      }), res);
      expect(res.speech()).to.contain('Welcome to music at the Internet Archive.');
    });
  });
  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore();
    adminInitStub.restore();
  });
});
