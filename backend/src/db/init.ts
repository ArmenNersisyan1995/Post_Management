import { User, Post } from 'db/models';
/* eslint-disable no-unused-expressions */
const dbInit = async () => {
  await User.sync();
  await Post.sync();
};

export default dbInit;
