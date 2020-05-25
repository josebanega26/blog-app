const Post = require("./post.model");

class PostService {
  constructor() {}

  async getPosts(tags) {
    try {
      const posts = await Post.find(tags);
      console.log("posts", posts);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct() {}
}

module.exports = PostService;
