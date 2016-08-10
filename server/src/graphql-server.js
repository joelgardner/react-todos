
var express = require('express');
var graphqlHTTP = require('express-graphql'),
    graphql = require('graphql'),
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLInt = graphql.GraphQLInt;
var User = require('./data/models/user').Model,
    Organization = require('./data/models/organization').Model,
    Contact = require('./data/models/contact').Model;

var TodoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Object representing a row in the todos table.',
  fields: {
    id: {
      type: GraphQLString,
      description: "The todo's id."
    },
    subject: {
      type: GraphQLString,
      description: "The todos's subject."
    },
    description: {
      type: GraphQLString,
      description: "The todos's description."
    },
    status: {
      type: GraphQLInt,
      description: "The todo's status."
    },
    createdAt: {
      type: GraphQLString, // date actually (TODO: use a custom graph data type)
      description: "The date and time the todo was created."
    },
    updatedAt: {
      type: GraphQLString, // date actually (TODO: use a custom graph data type)
      description: "The date and time the todo was created."
    }
  }
});

var TodoTagType = new GraphQLObjectType({
  name: 'TodoTag',
  description: 'Object representing a row in the todoTags table.',
  fields: {
    id: {
      type: GraphQLString,
      description: 'Id of the user'
    },
    email: {
      type: GraphQLString,
      description: 'Email'
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not the user is active.'
    },
    isVerified: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not a user\'s email has been verified.'
    }
  }
});


var BaselineQueryType = new GraphQLObjectType({
  name: "Baseline",
  description: "Baseline toplevel query",
  fields: {
    todos: {
      type: TodoType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function(_, args){
        return new Promise(function(resolve, reject) {
          Todo.forge({ id: args.id }).fetch()
            .then(function(org) {
                resolve(org.toJSON());
              }, reject);
        });
      }
    },
    organization: {
      type: OrganizationType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function(_, args) {
        return new Promise(function(resolve, reject) {
          Organization.forge({ id: args.id }).fetch()
            .then(function(org) {
              resolve(org.toJSON());
            }, reject);
        });
      }
    }
  }
});

var schema = new GraphQLSchema({
 query: BaselineQueryType
});

var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(9001);
console.log("The GraphQL Server is running.")
