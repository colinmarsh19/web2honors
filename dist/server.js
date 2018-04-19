'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Config
var APP_PORT = 3000;

// Start
var app = (0, _express2.default)();

app.get('/', function (request, response) {
    response.sendfile("index.html");
});

// GraphQL
app.use('/graphql', (0, _expressGraphql2.default)({
    schema: _schema2.default,
    pretty: true,
    graphiql: true
}));

app.use(_express2.default.static(__dirname + '/'));

app.listen(APP_PORT, function () {
    console.log('App listening on port ' + APP_PORT);
});
//# sourceMappingURL=server.js.map