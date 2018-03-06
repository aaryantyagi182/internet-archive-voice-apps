const playlist = require('../state/playlist');
const query = require('../state/query');
const intentStrings = require('../strings').intents.inOneGoArtistPlaybay;

const inOneGo = require('./high-order-handlers/in-one-go');

module.exports = inOneGo.build(intentStrings, playlist, query);
