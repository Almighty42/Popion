const { User, Post } = require("../models")

const { validateLoginInput, validateRegisterInput } = require("../auth/validators");

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const { UserInputError } = require("apollo-server-core");
const checkAuth = require('../auth/check-auth');
const { default: mongoose } = require("mongoose");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

const usersResolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 })
        return users
      } catch (err) {
        throw new Error(err)
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId)
        if (user) {
          return user
        } else {
          throw new Error('User not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async login(_, { username, password }, context) {

      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new Error('User not found');
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new Error('Wrong password');
      }

      const token = generateToken(user);

      context.auth = token

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username })
      if (user) {
        throw new Error('Username is taken');
      }

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        loggedIn: false,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    async updateUser(_, { updateInput: { username, email, password, id } }, context) {

      const user = checkAuth(context)

      if (password !== undefined && password !== '') {
        password = await bcrypt.hash(password, 12)
      } else {
        password = undefined
      }

      let postsData

      await User.findOne({ username: username }).then(userInfo => {
        if (userInfo === null) {
          User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { username: username, email: email, password: password }).then(() => { return })
          return Post.updateMany({ username: user.username }, { username: username, email: email }).then(() => {
            Post.find({ "comments": { $elemMatch: { "username": user.username } } }).then(e => {
              e.map(post => {
                post.comments.map(comment => {
                  if (comment.username === user.username) {
                    Post.updateOne({ "comments": { $elemMatch: { "username": user.username } } }, { $set: {
                      "comments.$.username": username
                    } }).then(e => { return })
                  }
                })
              })
            })
            return Post.find({ username: username }).then(e => postsData = e)
          })
        } else if (user.username != username) {
          throw new Error('Username taken!')
        } else {
          User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { email: email, password: password }).then(() => { return })
          return Post.updateMany({ username: user.username }, { username: username, email: email }).then(() => {
            return Post.find({ username: username }).then(e => postsData = e)
          })
        }
      })

      const updatedUser = User.findOne({ _id: new mongoose.Types.ObjectId(id) }).then(() => { return })

      const token = generateToken({ ...updatedUser._doc, username: username, id: id, email: email })

      context.auth = token

      postsData = JSON.stringify(postsData)

      return {
        ...updatedUser._doc,
        username: username,
        email: email,
        id: user.id,
        token,
        postsData
      }
    },
  }
}

module.exports = {
  usersResolvers
}