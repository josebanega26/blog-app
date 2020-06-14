const Post = require("./post.model");

class PostService {
  constructor() {}

  async get(tags) {
    try {
      const { pageSize, currentPage } = tags;
      const postCount = await Post.countDocuments();
      // Find Posts
      let posts;
      if (pageSize && currentPage) {
        posts = await Post.find()
          .skip(parseInt(pageSize) * (parseInt(currentPage) - 1))
          .limit(parseInt(pageSize));
      } else {
        posts = await Post.find();
      }
      return { posts, postCount };
    } catch (error) {}
  }
  async getById(id) {
    try {
      const post = await Post.findById({ _id: id });
      return post;
    } catch (error) {}
  }
  async delete(id, userId) {
    try {
      const post = await Post.deleteOne({ _id: id, creator: userId });
      const { deletedCount } = post;
      if (deletedCount > 0) {
        return {
          status: 200,
          message: "Post deleted successfully",
        };
      } else {
        return {
          status: 401,
          message: "user is not authorized to delete the post",
        };
      }
    } catch (error) {}
  }
  async update(id, post, imagePath) {
    const newPost = new Post({
      _id: id,
      imagePath: imagePath,
      ...post,
    });
    try {
      const postUpdated = await Post.updateOne(
        { _id: id, creator: post.creator },
        newPost
      );
      const { nModified } = postUpdated;
      if (nModified > 0) {
        return {
          status: 200,
          message: "Post update successfully",
        };
      } else {
        return {
          status: 401,
          message: "user is not authorized to modify the post",
        };
      }
    } catch (error) {}
  }
  async add(postData) {
    const post = new Post(postData);
    return post
      .save()
      .then(({ _id, body, title, imagePath }) => {
        return { id: _id, body, title, imagePath };
      })
      .catch((err) => {});
  }
}

module.exports = PostService;
