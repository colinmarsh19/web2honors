import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean
} from 'graphql';

import Db from './db';

const Dog = new GraphQLObjectType({
    name: 'Dog',
    description: 'A dog owned by someone',
    fields () {
        return {
            name: {
                type: GraphQLString,
                resolve (dog) {
                    return dog.name;
                }
            },
            breed: {
                type: GraphQLString,
                resolve (dog) {
                    return dog.breed;
                }
            },
            age: {
                type: GraphQLInt,
                resolve (dog) {
                    return dog.age;
                }
            },
            has_shots: {
                type: GraphQLBoolean,
                resolve (dog) {
                    return dog.has_shots;
                }
            },
            owner: {
                type: Owner,
                resolve (dog) {
                    return dog.getOwners();
                }
            }
        };
    }
});

const Owner = new GraphQLObjectType({
    name: 'Owner',
    description: 'This represents a Owner',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve (owner) {
                    return owner.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve (owner) {
                    return owner.name;
                }
            },
            phone: {
                type: GraphQLString,
                resolve (owner) {
                    return owner.phone;
                }
            },
            address: {
                type: GraphQLString,
                resolve (owner) {
                    return owner.address;
                }
            },
            dogs: {
                type: new GraphQLList(Dog),
                resolve (owner) {
                    return owner.getDogs();
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            owners: {
                type: new GraphQLList(Owner),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    phone: {
                        type: GraphQLString
                    }
                },
                resolve (root, args) {
                    return Db.models.owner.findAll({ where: args });
                }
            },
            dogs: {
                type: new GraphQLList(Dog),
                resolve (root, args) {
                    return Db.models.dog.findAll({ where: args });
                }
            }
        };
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    // mutation: Mutation
});

export default Schema;