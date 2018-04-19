'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dog = new _graphql.GraphQLObjectType({
    name: 'Dog',
    description: 'A dog owned by someone',
    fields: function fields() {
        return {
            name: {
                type: _graphql.GraphQLString,
                resolve: function resolve(dog) {
                    return dog.name;
                }
            },
            breed: {
                type: _graphql.GraphQLString,
                resolve: function resolve(dog) {
                    return dog.breed;
                }
            },
            age: {
                type: _graphql.GraphQLInt,
                resolve: function resolve(dog) {
                    return dog.age;
                }
            },
            has_shots: {
                type: _graphql.GraphQLBoolean,
                resolve: function resolve(dog) {
                    return dog.has_shots;
                }
            },
            owner: {
                type: Owner,
                resolve: function resolve(dog) {
                    return dog.getOwners();
                }
            }
        };
    }
});

var Owner = new _graphql.GraphQLObjectType({
    name: 'Owner',
    description: 'This represents a Owner',
    fields: function fields() {
        return {
            id: {
                type: _graphql.GraphQLInt,
                resolve: function resolve(owner) {
                    return owner.id;
                }
            },
            name: {
                type: _graphql.GraphQLString,
                resolve: function resolve(owner) {
                    return owner.name;
                }
            },
            phone: {
                type: _graphql.GraphQLString,
                resolve: function resolve(owner) {
                    return owner.phone;
                }
            },
            address: {
                type: _graphql.GraphQLString,
                resolve: function resolve(owner) {
                    return owner.address;
                }
            },
            dogs: {
                type: new _graphql.GraphQLList(Dog),
                resolve: function resolve(owner) {
                    return owner.getDogs();
                }
            }
        };
    }
});

var Query = new _graphql.GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: function fields() {
        return {
            owners: {
                type: new _graphql.GraphQLList(Owner),
                args: {
                    id: {
                        type: _graphql.GraphQLInt
                    },
                    phone: {
                        type: _graphql.GraphQLString
                    }
                },
                resolve: function resolve(root, args) {
                    return _db2.default.models.owner.findAll({ where: args });
                }
            },
            dogs: {
                type: new _graphql.GraphQLList(Dog),
                resolve: function resolve(root, args) {
                    return _db2.default.models.dog.findAll({ where: args });
                }
            }
        };
    }
});

var Schema = new _graphql.GraphQLSchema({
    query: Query
    // mutation: Mutation
});

exports.default = Schema;
//# sourceMappingURL=schema.js.map