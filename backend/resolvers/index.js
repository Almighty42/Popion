const { postsResolvers } = require('./postsResovlers');
const { usersResolvers } = require('./usersResolvers');
const { commentResolvers } = require('./commentResolvers')

const resolvers = [usersResolvers, postsResolvers, commentResolvers];

module.exports = {
  resolvers
};