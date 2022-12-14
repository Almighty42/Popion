const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../auth/check-auth')
const Post = require('../models/Post')

const commentResolvers = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            const post = await Post.findById(postId);

            if (post) {
                post.commentCount = post.commentCount + 1
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString(),
                });
                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(_, { postId, commentId }, context) {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                if (post.comments[commentIndex].username === username) {
                    post.commentCount = post.commentCount - 1
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}

module.exports = {
    commentResolvers
}