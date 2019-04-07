const argon2 = require('argon2');

export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        const hashedPassword = await argon2.hash(password);
        await models.User.create({ ...otherArgs, password: hashedPassword });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
