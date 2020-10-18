const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('books');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
      
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, args, context) => {
        if (context.user) {
            const thought = await Book.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { books: book._id } },
                { new: true }
            );
        
            return thought;
        }
    
        throw new AuthenticationError('You need to be logged in!');
      },
      removeBook: async (parent, args, context) => {
        if (context.user) {
            const thought = await Book.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { books: book._id } },
                { new: true }
            );
        
            return thought;
        }
    
        throw new AuthenticationError('You need to be logged in!');
      }
    }
};

module.exports = resolvers;