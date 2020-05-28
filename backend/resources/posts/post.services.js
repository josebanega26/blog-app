const Post = require("./post.model");

class PostService {
  constructor() {}

  async get(tags) {
    try {
      const posts = await Post.find(tags);
      console.log("posts", posts);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const post = await Post.findById(id);
      console.log("post", post);
      return post;
    } catch (error) {
      console.log("error", error);
    }
  }
  async delete(id) {
    try {
      const post = await Post.deleteOne({ _id: id });
      console.log("post", post);
      return post;
    } catch (error) {
      console.log("error", error);
    }
  }
  async update(id, post) {
    try {
      const postUpdated = await Post.updateOne({ _id: id }, post);
      return postUpdated;
    } catch (error) {}
  }
  async add(postData) {
    const post = new Post(postData);
    console.log("postId", post);
    return post
      .save()
      .then(({ _id }) => {
        return _id;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = PostService;
