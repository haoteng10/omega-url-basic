const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;
const Website = require("../models/website");
const Author = require("../models/author");

const WebsiteType = new GraphQLObjectType({
    name: "Website",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        url: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return _.find(authors, { id: parent.authorId })
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        websites: {
            type: GraphQLList(WebsiteType),
            resolve(parent, args){
                // return _.filter(websites, {authorId: parent.id});
                return Website.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        website: {
            type: WebsiteType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args){
                // get data from DB
                // return _.find(websites, {id: args.id});
                return Website.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID }},
            resolve(parent, args) {
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        websites: {
            type: GraphQLList(WebsiteType),
            resolve(_parent, _args){
                // return websites;
                return Website.find({});
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(_parent, _args){
                // return authors;
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name
                });
                return author.save();
            }
        },
        addWebsite: {
            type: WebsiteType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                slug: { type: new GraphQLNonNull(GraphQLString) },
                url: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let website = new Website({
                    name: args.name,
                    slug: args.slug,
                    url: args.url,
                    authorId: args.authorId
                });
                return website.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

