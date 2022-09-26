const { Post } = require('../models');
const checkAuth = require('../auth/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server');

const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts;
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {

      const user = checkAuth(context)

      if (body.trim() === '') {
        throw new Error('Post body must not be empty')
      }

      const newPost = new Post({
        body,
        user: user.id,
        userId: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
      })

      const post = await newPost.save()

      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.delete()
          return 'Post deleted success'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likePost(_, { postId, userId }, context) {

      const { username, id } = checkAuth(context)

      const post = await Post.findById(postId)

      if (post) {
        if (post.likes.find(like => like.userId === id)) {
          // Post already liked, unlike it
          post.likeCount = post.likeCount - 1
          post.likes = post.likes.filter(like => like.userId !== id)
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
            likeCount: post.likeCount++,
            userId: userId
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
}

module.exports = {
  postsResolvers
}